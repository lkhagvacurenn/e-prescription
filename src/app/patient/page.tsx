'use client';

import Header from '@/components/Header';
import PharmacyMap from '@/components/PharmacyMap';
import mockMedicines from '@/mock/medicine/mockMedicines';
import styles from '@/styles/patience.module.css';

// Эмийн мэдээллийн интерфэйс
interface Medicine {
  name: string;
  defaultDose: string;
  defaultFrequency: string;
  defaultDuration: string;
  instructions: string;
}

export default function PatientHome() {
  // Жинхэнэ Google Maps API түлхүүрийг энд оруулна
  const GOOGLE_MAPS_API_KEY = 'AIzaSyBWxdmDo7Je-v54BPuccjI4pPkwEkI9-Hg';

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section id="prescriptions" className={styles.history}>
          <h2 className={styles.title}>Миний эмийн жор</h2>
          <ul className={styles.list}>
            {mockMedicines.map((medicine: Medicine, index: number) => (
              <li key={index} className={styles.listItem}>
                <div>
                  <div className={styles.medName}>{medicine.name}</div>
                  <div className={styles.medDetails}>
                    <p className={styles.date}>
                      <strong>Тун:</strong> {medicine.defaultDose}
                    </p>
                    <p className={styles.date}>
                      <strong>Давтамж:</strong> {medicine.defaultFrequency}
                    </p>
                    <p className={styles.date}>
                      <strong>Хугацаа:</strong> {medicine.defaultDuration}
                    </p>
                    <p className={styles.date}>
                      <strong>Заавар:</strong> {medicine.instructions}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <PharmacyMap apiKey={GOOGLE_MAPS_API_KEY} searchType="pharmacy,drugstore" />
      </main>
    </div>
  );
}