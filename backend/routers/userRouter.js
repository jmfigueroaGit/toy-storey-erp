import express from 'express'
import asyncHandler from 'express-async-handler'
import Customer from '../models/customerModel.js'

const router = express.Router()

// @desc    get list of all customers
// @route   /api/sales/customerlist
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const customers = await Customer.find({})
    res.json(customers)
  })
)

// @desc    add new customer
// route    /api/sales/customerlist/add-new-customer
router.post(
  '/add-new-customer',
  asyncHandler(async (req, res) => {
      
    const { fullName, email, address, contact } = req.body;  
    const customerExists = await Customer.findOne({ email })
    if (customerExists) {
      res.send('Message: Customer Exists')
    }
    const customer = await Customer.create({
      fullName,
      email,
      address,
      contact
    })

    if (customer) {
      res.status(201).json({
        fullName: customer.fullName,
        email: customer.email,
        address: customer.address,
        contact: customer.contact,
      })
    } else {
      res.status(401).send({ message: 'Add Customer Failed'})
    }
  })
)

export default router