import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

// ✅ Global interface тодорхойлох
interface MongooseGlobal {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// ✅ globalThis дээр өргөтгөл хийх
declare global {
  // allow global `var` mongoose in Node.js with TypeScript
  var _mongoose: MongooseGlobal | undefined
}

const globalWithMongoose = global as typeof globalThis & {
  _mongoose: MongooseGlobal
}

// ✅ Cache хадгалах хувьсагч
let cached = globalWithMongoose._mongoose

if (!cached) {
  cached = globalWithMongoose._mongoose = { conn: null, promise: null }
}

// ✅ dbConnect функц
async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise
  return cached.conn
}

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function comparePassword(inputPassword: string, hashedPassword: string) {
  return await bcrypt.compare(inputPassword, hashedPassword)
}

export function generateToken(user: any) {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  )
}


export default dbConnect
