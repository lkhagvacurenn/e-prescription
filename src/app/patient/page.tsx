'use client';

import Header from '@/components/Header';
import PrescriptionHistory from '@/components/PrescriptionHistory';

export default function DoctorHome() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: 24 }}>
        <section id="prescriptions" className="card">
          <h2>Миний жор</h2>
          <ul className="prescription-list">
            {prescriptions.map((p, index) => (
              <li key={index} className="prescription-item">
                <div>
                  <div className="prescription-name">{p.prescription.split(' ').slice(0, 3).join(' ')}...</div>
                  <div className="prescription-date">{p.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
