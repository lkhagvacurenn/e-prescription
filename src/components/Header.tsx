'use client';
import { Input, Avatar, } from 'antd';
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
      <h2 style={{ margin: 0 }}>E-Жор</h2>

        <Input.Search
          placeholder="Жор хайх..."
          allowClear
          style={{ width: '100%', maxWidth: 800, color: '#000000' }}
        />
        <Avatar icon={<UserOutlined />} />
    </div>
  );
}
