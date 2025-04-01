'use client';
import { Input, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default function Header() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderBottom: '1px solid #eee',
      gap: 16,
    }}>
      <h2 style={{ margin: 0 }}>e-jor</h2>

        <Input.Search
          placeholder="Жор хайх..."
          allowClear
          style={{ width: '100%', maxWidth: 800 }}
        />
        <Avatar icon={<UserOutlined />} />
    </div>
  );
}
