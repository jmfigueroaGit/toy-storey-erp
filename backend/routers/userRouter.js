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
    if (customers) {
      res.status(200).json(customers)
    } else {
      res.status(500).send({ message: 'Failed fetching customerlist' })
    }
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


router.get(
  '/details',
  asyncHandler(async (req, res) => {
    const customer = await Customer.findOne({ 'fullName': req.body.fullName });
    if (customer) {
      res.send(customer);
      console.log('BACKEND: customer._id', customer._id)
      console.log('BACKEND: customer.name', customer.fullName)
    } else {
      res.status(404).send({ message: 'Customer Not Found' });
    }
  })
)

export default router