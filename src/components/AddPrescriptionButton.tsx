// components/AddPrescriptionButton.tsx
'use client';
import { Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons'

export default function AddPrescriptionButton() {
  return (
    <div style={{textAlign: 'center', margin: '24px 0' }}>
      <Button type="primary" size="large" icon={<PlusOutlined/>} iconPosition='end'>
         Жор нэмэх
      </Button>
    </div>
  );
}
