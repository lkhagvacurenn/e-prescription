'use client';

import Header from '@/components/Header';
import PharmacyMap from '@/components/PharmacyMap';
import PrescriptionList from '@/components/PrescriptionList';
import mockPrescriptions from '@/mock/prescriptions/mockPrescriptions'; // assume correct mock
import styles from '@/styles/patience.module.css';

export default function PatientHome() {
  // Жинхэнэ Google Maps API түлхүүрийг энд оруулна
  const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY';

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section id="prescriptions">
          <h2 className={styles.title}>Миний эмийн жорууд</h2>
          <PrescriptionList prescriptions={mockPrescriptions} />
        </section>
        <PharmacyMap apiKey={GOOGLE_MAPS_API_KEY} searchType="pharmacy,drugstore" />
      </main>
    </div>
  );
}
