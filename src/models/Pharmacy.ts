import mongoose from 'mongoose'

const pharmacySchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: 'pharmacy' }
})

export default mongoose.models.Pharmacy || mongoose.model('Pharmacy', pharmacySchema)
