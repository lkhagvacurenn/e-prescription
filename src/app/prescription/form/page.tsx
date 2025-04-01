'use client';

import { Form, Input, Select, DatePicker, Button, Typography, Row, Col, message } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { mockMedicines } from '@/mock/medicine/mockMedicines'; 

const { Option } = Select;

export default function PrescriptionFormPage() {
  const [form] = Form.useForm();

  const handleMedicineChange = (value: string) => {
    const selected = mockMedicines.find((m) => m.name === value);
    if (selected) {
      form.setFieldsValue({
        dose: selected.defaultDose,
        frequency: selected.defaultFrequency,
        duration: selected.defaultDuration,
        usage: selected.instructions,
      });
    }
  };

  const onFinish = (values: any) => {
    alert('Форм илгээгдлээ!');
    console.log('Жорын утгууд:', values);
  };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 24 }}>
      <Typography.Title level={3}>📝 Эмийн жор бөглөх</Typography.Title>

      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{ date: dayjs() }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item name="patientName" label="Өвчтөний Регистрийн дугаар" rules={[{ required: true }]}>
              <Input placeholder="Жишээ: VP04040404" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="date" label="Огноо">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="medicine" label="Эмийн нэр" rules={[{ required: true }]}>
              <Select
                showSearch
                placeholder="Эм сонгоно уу"
                onChange={handleMedicineChange}
                filterOption={(input, option) =>
                  (option?.label as string).toLowerCase().includes(input.toLowerCase())
                }
                options={mockMedicines.map((med) => ({
                  label: med.name,
                  value: med.name,
                }))}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="dose" label="Тун" rules={[{ required: true }]}>
              <Input placeholder="Жишээ: 500mg" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="frequency" label="Давтамж" rules={[{ required: true }]}>
              <Select placeholder="Хичнээн удаа уух вэ">
                <Option value="once">Өдөрт 1 удаа</Option>
                <Option value="twice">Өдөрт 2 удаа</Option>
                <Option value="thrice">Өдөрт 3 удаа</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item name="duration" label="Хугацаа" rules={[{ required: true }]}>
              <Input placeholder="Жишээ: 7 хоног" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="usage" label="Хэрэглэх заавар">
              <Input.TextArea rows={3} placeholder="Жишээ: Хоолны дараа ууна" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="note" label="Тэмдэглэл (заавал биш)">
              <Input.TextArea rows={2} placeholder="Нэмэлт тэмдэглэл" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Жор хадгалах
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
