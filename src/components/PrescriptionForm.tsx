import {Form, Input, Select, DatePicker, Button, Row,Col, FormInstance} from 'antd';
import dayjs from 'dayjs';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { mockMedicines } from '@/mock/medicine/mockMedicines';

interface Props {
  form: FormInstance;
  onFinish: (values: any) => void;
}


const { Option } = Select;

export default function PrescriptionForm({ form, onFinish }: Props) {

  const handleMedicineChange = (value: string, fieldName: string, index: number) => {
    const selected = mockMedicines.find((m) => m.name === value);
    if (selected) {
      const currentFields = form.getFieldValue('medicines') || [];
      currentFields[index] = {
        ...currentFields[index],
        dose: selected.defaultDose,
        frequency: selected.defaultFrequency,
        duration: selected.defaultDuration,
        usage: selected.instructions,
      };
      form.setFieldsValue({ medicines: currentFields });
    }
  };

  return (
    
    <Form layout="vertical" form={form} onFinish={onFinish} initialValues={{ date: dayjs(), medicines: [{}], }}>
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <Form.Item
          name="patientName"
          label="Өвчтөний Регистрийн дугаар"
          rules={[{ required: true }]}
        >
          <Input placeholder="Жишээ: VP04040404" />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item name="date" label="Огноо">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>

    <Form.List name="medicines">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }, index) => (
            <Row gutter={16} key={key} align="middle">
              <Col xs={24} md={6}>
                <Form.Item
                  {...restField}
                  name={[name, 'medicine']}
                  label="Эмийн нэр"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Сонгох"
                    onChange={(val) => handleMedicineChange(val, 'medicine', index)}
                    options={mockMedicines.map((med) => ({ label: med.name, value: med.name }))}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={3}>
                <Form.Item
                  {...restField}
                  name={[name, 'dose']}
                  label="Тун"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={4}>
                <Form.Item
                  {...restField}
                  name={[name, 'frequency']}
                  label="Давтамж"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="once">Өдөрт 1 удаа</Option>
                    <Option value="twice">Өдөрт 2 удаа</Option>
                    <Option value="thrice">Өдөрт 3 удаа</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={3}>
                <Form.Item
                  {...restField}
                  name={[name, 'duration']}
                  label="Хугацаа"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={6}>
                <Form.Item
                  {...restField}
                  name={[name, 'usage']}
                  label="Хэрэглэх заавар"
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={2} style={{ textAlign: 'center' }}>
                <Button type="text" danger onClick={() => remove(name)} icon={<MinusCircleOutlined />} />
              </Col>
            </Row>
          ))}

          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Эм нэмэх
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>

    <Form.Item name="note" label="Нэмэлт тэмдэглэл">
      <Input.TextArea rows={3} />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit">
        Жор үүсгэх
      </Button>
    </Form.Item>
  </Form>
  );
}