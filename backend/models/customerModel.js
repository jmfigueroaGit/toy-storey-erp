import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true},
    email: { type: String, required: true},
    address: { type: String, required: true},
    contact: { type: String, required: true},
  },
  {
    timestamp: true
  }
);

const Customer = mongoose.model('Customer', customerSchema)
export default Customer