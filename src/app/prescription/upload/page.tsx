'use client';

import { Upload, Button, Typography, message } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useState } from 'react';

export default function UploadPrescriptionPage() {
  const [fileList, setFileList] = useState<any[]>([]);

  const props: UploadProps = {
    name: 'prescription',
    multiple: false,
    listType: 'picture',
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Зөвхөн зураг оруулна уу');
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onChange(info) {
      setFileList(info.fileList);
    },
    onRemove: () => {
      setFileList([]);
    },
  };

  const handleSubmit = () => {
    if (fileList.length === 0) {
      message.warning('Зураг оруулна уу');
      return;
    }

    // API илгээх logic энд байна
    console.log('Илгээж буй файл:', fileList[0].originFileObj);
    message.success('Зураг амжилттай илгээгдлээ');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <Typography.Title level={3}>📸 Жорын зураг оруулах</Typography.Title>

      <Upload.Dragger {...props} fileList={fileList}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Зураг дарж сонгох эсвэл чирж тавих</p>
        <p >JPG, PNG, HEIC, PDF (image) зөвшөөрнө</p>
      </Upload.Dragger>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={handleSubmit}
          disabled={fileList.length === 0}
        >
          Илгээх
        </Button>
      </div>
    </div>
  );
}
