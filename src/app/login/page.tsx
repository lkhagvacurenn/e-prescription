// app/login/page.tsx
'use client';

import { Button, Form, Input, Typography } from 'antd';

export default function LoginPage() {
  const onFinish = (values: any) => {
    console.log('Нэвтрэх мэдээлэл:', values);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        padding: 24,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: 8,
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
      }}>
        <Typography.Title level={3} style={{ textAlign: 'center', color: 'var(--foreground)' }}>
          Нэвтрэх
        </Typography.Title>
        <Form name="login" layout="vertical" onFinish={onFinish}>
          <Form.Item label="Имэйл" name="email" rules={[{ required: true, message: 'Имэйл хаягаа оруулна уу!' }]}>
            <Input placeholder="email@example.com" />
          </Form.Item>
          <Form.Item label="Нууц үг" name="password" rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}>
            <Input.Password placeholder="password is required" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Нэвтрэх
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
