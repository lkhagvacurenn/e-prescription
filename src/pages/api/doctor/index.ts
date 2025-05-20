import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/lib/mongodb'
import Doctor from '@/models/Doctor'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()

  if (req.method === 'POST') {
    const { name, specialty, email, password } = req.body
    const doctor = new Doctor({ name, specialty, email, password })
    await doctor.save()
    return res.status(201).json(doctor)
  }

  if (req.method === 'GET') {
    const doctors = await Doctor.find()
    return res.status(200).json(doctors)
  }

  return res.status(405).json({ message: 'Method Not Allowed' })
}
