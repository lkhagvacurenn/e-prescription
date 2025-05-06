'use client';

import {Form, Typography} from 'antd';
import PrescriptionForm from '@/components/PrescriptionForm';

export default function PrescriptionFormPage() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    alert('Жор илгээгдлээ!');
    console.log('Бүх мэдээлэл:', values);
  };

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 24 }}>
      <Typography.Title level={3}>📝 Эмийн жор бөглөх</Typography.Title>

      <PrescriptionForm form={form} onFinish={onFinish} />
    </div>
  );
}