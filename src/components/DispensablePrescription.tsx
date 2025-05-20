// DispensablePrescription.tsx
'use client';

import { useState } from 'react';
import { Button, Checkbox, Typography, List, Row, Col } from 'antd';

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
  prescription: Prescription;
  onBack: () => void;
}

export default function DispensablePrescription({ prescription, onBack }: Props) {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(prescription.medicines.length).fill(false)
  );

  const toggleCheck = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const allChecked = checked.every((v) => v);

  return (
    <div>
      <Typography.Title level={4}>Жор: {prescription.patientName}</Typography.Title>
      <p>Огноо: {prescription.date}</p>

      <List
        header={<strong>Эмийн жагсаалт</strong>}
        dataSource={prescription.medicines}
        renderItem={(med, idx) => (
          <List.Item>
            <Row style={{ width: '100%' }}>
              <Col span={20}>
                <strong>{med.medicine}</strong> — {med.dose}, {med.frequency}, {med.duration}<br />
                {med.usage && <em>Заавар: {med.usage}</em>}
              </Col>
              <Col span={4}>
                <Checkbox
                  checked={checked[idx]}
                  onChange={() => toggleCheck(idx)}
                />
              </Col>
            </Row>
          </List.Item>
        )}
      />

      {prescription.note && <p><strong>Тэмдэглэл:</strong> {prescription.note}</p>}

      <div style={{ marginTop: 16 }}>
        <Button onClick={onBack} style={{ marginRight: 8 }}>
          Буцах
        </Button>
        <Button type="primary" disabled={!allChecked} onClick={() => alert('Эм олгогдлоо!')}>
          Олгох
        </Button>
      </div>
    </div>
  );
}
