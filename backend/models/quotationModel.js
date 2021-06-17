import mongoose from 'mongoose'

const quotationSchema = new mongoose.Schema(
  {
    customer: { type: String, ref: 'Customer', required: true },
    invoiceAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    orderItems: [
      {
        productName: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        productId: {
          type: String,
          ref: 'Product',
          required: true,
        },
      },
    ],
    itemsPrice: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    totalPrice : { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    toInvoice: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
)

const Quotation = mongoose.model('Quotation', quotationSchema)
export default Quotation