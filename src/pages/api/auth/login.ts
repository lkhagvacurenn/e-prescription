import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI!)
const dbName = 'e-prescription'
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password, role } = req.body

  if (!email || !password || !role) {
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

    const user = await collection.findOne({ email: lowerEmail })
    if (!user) return res.status(401).json({ message: 'Хэрэглэгч олдсонгүй' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Нууц үг буруу' })

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    )

    return res.status(200).json({
      message: 'Нэвтрэлт амжилттай',
      token,
      role
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Серверийн алдаа' })
  } finally {
    await client.close()
  }
}
