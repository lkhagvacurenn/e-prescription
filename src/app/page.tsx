'use client';

import { Button, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';

const { Title } = Typography;

export default function Home() {
  const router = useRouter();

  return (
    <main style={{ display: 'flex', minHeight: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Title>WELCOME TO E-PRESCRIPTION</Title>

      <Space size="large" style={{ marginTop: '2rem' }}>
        <Button type="primary" size="large" onClick={() => router.push('/doctor')}>
          Doctor
        </Button>
        <Button type="primary" size="large" onClick={() => router.push('/patient')}>
          Patient
        </Button>
        <Button type="primary" size="large" onClick={() => router.push('/pharmacist')}>
          Pharmacist
        </Button>
      </Space>
    </main>
  );
}
