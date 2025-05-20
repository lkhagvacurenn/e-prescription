import mongoose from 'mongoose'

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'doctor' }
})

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema)
