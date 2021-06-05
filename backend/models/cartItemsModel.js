import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  cart: [{
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    subTotal: { type: Number, required: true },
  }]
})

const Cart = mongoose.model('Cart', cartSchema)
export default Cart