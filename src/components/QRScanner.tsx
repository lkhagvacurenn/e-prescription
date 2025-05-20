'use client';

import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';
import { Button, message, Upload, Typography, Card } from 'antd';
import { UploadOutlined, CameraOutlined } from '@ant-design/icons';

interface Props {
  onResult: (data: any) => void;
}

export default function QRScanner({ onResult }: Props) {
  const scannerId = 'qr-reader';
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [scanning, setScanning] = useState(false);

  // 🎥 Camera Scanner
  useEffect(() => {
    if (!scanning) return;

    const html5Qr = new Html5Qrcode(scannerId);
    scannerRef.current = html5Qr;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          const cameraId = devices[0].id;
          html5Qr.start(
            cameraId,
            { fps: 10, qrbox: 250 },
            (decodedText) => {
              try {
                const parsed = JSON.parse(decodedText);
                html5Qr.stop();
                onResult(parsed);
              } catch {
                message.error('QR доторх мэдээлэл буруу байна');
              }
            },
            (errorMessage) => {
              // Do nothing on not found
            }
          );
        } else {
          message.error('Камер олдсонгүй');
        }
      })
      .catch(() => {
        message.error('Камер нээгдсэнгүй');
      });

    return () => {
      html5Qr.stop().catch(() => {});
    };
  }, [scanning, onResult]);

const handleImageUpload = async (file: File) => {
  const html5Qr = new Html5Qrcode('qr-reader-upload'); // 👈 separate div ID for image scan

  try {
    const result = await html5Qr.scanFile(file, true); // true = show image
    console.log('QR from image:', result);
    const parsed = JSON.parse(result);
    onResult(parsed);
  } catch (e) {
    console.error('QR image scan failed:', e);
    message.error('Зураг дээр QR уншиж чадсангүй');
  } finally {
    await html5Qr.clear();
  }
};


  return (
    <Card style={{ padding: 24, borderRadius: 12, marginTop: 24 }}>
      <Typography.Title level={5}>QR унших</Typography.Title>

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<CameraOutlined />}
          onClick={() => setScanning(true)}
          style={{ marginRight: 12 }}
        >
          Камер уншуулах
        </Button>

       <>
  ...
  <Upload
    accept="image/*"
    showUploadList={false}
    beforeUpload={(file) => {
      handleImageUpload(file);
      return false;
    }}
  >
    <Button icon={<UploadOutlined />}>Зураг оруулах</Button>
  </Upload>

  <div id="qr-reader-upload" style={{ display: 'none' }} />
</>

      </div>

      <div
        id={scannerId}
        style={{
          width: scanning ? 300 : 0,
          height: scanning ? 300 : 0,
          overflow: 'hidden',
          border: scanning ? '1px dashed #aaa' : 'none',
          borderRadius: 6,
        }}
      />
    </Card>
  );
}
