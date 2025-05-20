// utils/verifyDoctor.ts
export async function verifyDoctorFromAPI(nationalId: string) {
  const res = await fetch('https://api.example.com/doctor-check', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.DOCTOR_API_KEY}`
    },
    body: JSON.stringify({ nationalId })
  });

  const data = await res.json();
  return data.isDoctor === true;
}
