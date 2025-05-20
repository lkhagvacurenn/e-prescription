'use client';
import { useState } from 'react';

interface MedicineDetailChatProps {
  medicineName: string;
}

export default function MedicineDetailChat({ medicineName }: MedicineDetailChatProps) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const res = await fetch('/api/medicine-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ medicineName }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '10px',
                backgroundColor:'#000',
                borderRadius:'20px'
    }}>
      <button onClick={handleClick} style={{ backgroundColor:"#000",
        borderRadius:'20px'
      }} >Эмийн талаарх дэлгэрэнгүй мэдээлэл</button>
      {loading ? <p>Уншиж байна...</p> : response && <p><strong>AI:</strong> {response}</p>}
    </div>
  );
}
