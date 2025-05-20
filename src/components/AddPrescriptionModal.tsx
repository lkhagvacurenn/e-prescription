'use client';

import { Modal, Button, Space } from 'antd';
import {
  UploadOutlined,
  FormOutlined,
  AudioOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPrescriptionModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOption = (type: string) => {
    setOpen(false);
    router.push(`/prescription/${type}`);
  };

  return (
    <>
      <div style={{ textAlign: 'center', margin: '24px 0' }}>
        <Button
          type="primary"
          size="large"
          onClick={() => setOpen(true)}
          icon={<PlusOutlined />}
        >
          Жор нэмэх
        </Button>
      </div>

      <Modal
        title="Жор нэмэх арга сонгоно уу"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        centered
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button icon={<UploadOutlined />} block onClick={() => handleOption('upload')}>
            Зураг оруулах
          </Button>
          <Button icon={<FormOutlined />} block onClick={() => handleOption('form')}>
            Форм бөглөх
          </Button>
          <Button icon={<AudioOutlined />} block onClick={() => handleOption('voice')}>
            Дуу хоолойгоор бөглөх
          </Button>
        </Space>
      </Modal>
    </>
  );
}
