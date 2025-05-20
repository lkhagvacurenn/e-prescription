'use client';

import Header from '@/components/Header';
import AddPrescriptionModal from '@/components/AddPrescriptionModal';
import PrescriptionList from '@/components/PrescriptionList';

import mockPrescriptions from '@/mock/prescriptions/mockPrescriptions';

export default function DoctorHome() {
  return (
    <div>
      <Header />
      <main style={{ paddingTop: 24 }}>
        <AddPrescriptionModal/>
        <PrescriptionList prescriptions={mockPrescriptions}/>
      </main>
    </div>
  );
}
