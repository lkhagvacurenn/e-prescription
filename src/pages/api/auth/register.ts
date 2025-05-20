import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)
const dbName = 'e-prescription'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, password, role } = req.body

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Бүх талбарыг бөглөнө үү' })
  }

  const validRoles = ['doctor', 'patient', 'pharmacy']
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Role буруу байна' })
  }

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(`${role}s`)

    const lowerEmail = email.toLowerCase().trim()
    const existing = await collection.findOne({ email: lowerEmail })
    if (existing) {
      return res.status(409).json({ message: 'Имэйл бүртгэлтэй байна' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await collection.insertOne({
      name,
      email: lowerEmail,
      password: hashedPassword,
      role,
      createdAt: new Date()
    })

    return res.status(201).json({
      message: 'Бүртгэл амжилттай',
      user: {
        name,
        email: lowerEmail,
        role
      }
    })
  } catch (error) {
    console.error('MongoDB Register error:', error)
    return res.status(500).json({ message: 'Серверийн алдаа' })
  } finally {
    await client.close()
  }
}
