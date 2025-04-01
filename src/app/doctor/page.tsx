'use client';

import Header from '@/components/Header';
import AddPrescriptionButton from '@/components/AddPrescriptionButton';
import AddPrescriptionModal from '@/components/AddPrescriptionModal';
import PrescriptionHistory from '@/components/PrescriptionHistory';

export default function DoctorHome() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: 24 }}>
        <AddPrescriptionModal/>
        <PrescriptionHistory />
      </main>
    </div>
  );
}
