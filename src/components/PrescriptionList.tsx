'use client';
import { useState } from 'react';
import { Card, Modal, Typography, List, Button } from 'antd';
import dayjs from 'dayjs';

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

  const handleCardClick = (prescription: Prescription) => {
    setSelected(prescription);
    setOpen(true);
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
              <p style={{color:"#5694f0"}}>Дэлгэрэнгүй харах</p>
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
            {selected.note && <p style={{ marginTop: 12 }}><strong>Тэмдэглэл:</strong> {selected.note}</p>}
          </>
        )}
      </Modal>
    </div>
  );
}
