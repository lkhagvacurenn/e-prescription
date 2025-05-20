'use client';

import { useState } from 'react';
import { Card, Modal, Typography, List, Button, Space } from 'antd';
import dayjs from 'dayjs';
import TextToSpeech from '@/components/TextToSpeech';

interface Medicine {
  medicine: string;
  dose: string;
  frequency: string;
  duration: string;
  usage?: string;
}

interface Prescription {
  patientName: string;
  date: string;
  medicines: Medicine[];
  note?: string;
}

interface Props {
  prescriptions: Prescription[];
}

export default function PrescriptionList({ prescriptions }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Prescription | null>(null);
  const [showQR, setShowQR] = useState(false);

  const handleCardClick = (prescription: Prescription) => {
    setSelected(prescription);
    setOpen(true);
    setShowQR(false); // Reset QR toggle on open
  };

  const generateSpeechText = (prescription: Prescription) => {
    return prescription.medicines
      .map(
        (med, idx) =>
          `${idx + 1}. Эмийн нэр: ${med.medicine}, тун: ${med.dose}, давтамж: ${med.frequency}, хугацаа: ${med.duration}${med.usage ? ', заавар: ' + med.usage : ''}`
      )
      .join(' | ');
  };

  const generateQrUrl = (prescription: Prescription) => {
    const jsonData = JSON.stringify(prescription);
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(jsonData)}&size=200x200`;
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <Typography.Title level={3}>📋 Бүх жорууд</Typography.Title>

      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={prescriptions}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={`Регистр: ${item.patientName}`}
              extra={dayjs(item.date).format('YYYY-MM-DD')}
              hoverable
              onClick={() => handleCardClick(item)}
            >
              <p style={{ color: "#5694f0" }}>Дэлгэрэнгүй харах</p>
            </Card>
          </List.Item>
        )}
      />

      <Modal
        open={open}
        title={`Жор - ${selected?.patientName}`}
        footer={<Button onClick={() => setOpen(false)}>Хаах</Button>}
        onCancel={() => setOpen(false)}
      >
        {selected && (
          <>
            <p><strong>Огноо:</strong> {dayjs(selected.date).format('YYYY-MM-DD')}</p>

            <Space style={{ marginBottom: 16 }}>
              <TextToSpeech text={generateSpeechText(selected)} />
              <Button onClick={() => setShowQR(!showQR)}>
                {showQR ? 'QR нуух' : 'QR үүсгэх'}
              </Button>
            </Space>

            {showQR && (
              <div style={{ marginBottom: 16 }}>
                <img
                  src={generateQrUrl(selected)}
                  alt="Жорын QR код"
                  style={{ border: '1px solid #ccc', padding: 8 }}
                />
              </div>
            )}

            <List
              header={<strong>Эмийн жагсаалт</strong>}
              dataSource={selected.medicines}
              renderItem={(med, idx) => (
                <List.Item>
                  <div>
                    <strong>{idx + 1}. {med.medicine}</strong><br />
                    Тун: {med.dose}, Давтамж: {med.frequency}, Хугацаа: {med.duration}<br />
                    {med.usage && <em>Заавар: {med.usage}</em>}
                  </div>
                </List.Item>
              )}
            />

            {selected.note && (
              <p style={{ marginTop: 12 }}><strong>Тэмдэглэл:</strong> {selected.note}</p>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
