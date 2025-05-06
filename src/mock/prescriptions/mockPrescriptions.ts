const mockPrescriptions =[
    {
      patientName: 'VP04040404',
      date: '2025-05-06',
      medicines: [
        { medicine: 'Ibuprofen', dose: '400mg', frequency: 'twice', duration: '5 хоног', usage: 'Хоолны дараа' },
        { medicine: 'Paracetamol', dose: '500mg', frequency: 'once', duration: '3 хоног' }
      ],
      note: 'Давхар антибиотик хэрэглэхгүй байх'
    }
    ,
    {
      patientName: 'VP04040405',
      date: '2025-05-07',
      medicines: [
        { medicine: 'Amoxicillin', dose: '250mg', frequency: 'thrice', duration: '7 хоног', usage: 'Өдөрт 3 удаа' },
        { medicine: 'Ibuprofen', dose: '400mg', frequency: 'twice', duration: '5 хоног' }
      ],
      note: 'Хоолны дараа ууна'
    }
    ,
    {
      patientName: 'VP04040406',
      date: '2025-05-08',
      medicines: [
        { medicine: 'Paracetamol', dose: '500mg', frequency: 'once', duration: '3 хоног', usage: 'Өвдөлт мэдрэгдсэн үед' },
        { medicine: 'Ibuprofen', dose: '400mg', frequency: 'twice', duration: '5 хоног' },
        { medicine: 'Amoxicillin', dose: '250mg', frequency: 'thrice', duration: '7 хоног' },
        { medicine: 'Ibuprofen', dose: '400mg', frequency: 'twice', duration: '5 хоног' },
        { medicine: 'Paracetamol', dose: '500mg', frequency: 'once', duration: '3 хоног' },
        { medicine: 'Amoxicillin', dose: '250mg', frequency: 'thrice', duration: '7 хоног' },
      ],
      note: 'Хоолны өмнө ууна'
    }
  ]
  export default mockPrescriptions;