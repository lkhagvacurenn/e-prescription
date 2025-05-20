// PharmacistHomePage.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import QRScanner from '@/components/QRScanner';
import DispensablePrescription from '@/components/DispensablePrescription';
import { Button } from 'antd';

export default function PharmacistHomePage() {
  const [prescription, setPrescription] = useState(null);
  const [scanning, setScanning] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <Header />
      <h2>📋 Эмийн жор унших (Эмийн сан)</h2>

      {!prescription && !scanning && (
        <Button type="primary" onClick={() => setScanning(true)}>
          📷 QR уншуулах
        </Button>
      )}

      {!prescription && scanning && (
        <QRScanner
          onResult={(data) => {
            setPrescription(data);
            setScanning(false);
          }}
        />
      )}

      {prescription && (
        <DispensablePrescription
          prescription={prescription}
          onBack={() => {
            setPrescription(null);
            setScanning(false);
          }}
        />
      )}
    </div>
  );
}