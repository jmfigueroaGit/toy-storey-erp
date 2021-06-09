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
    console.log(req.body.fullName)
    const customer = await Customer.findOne({ fullName: req.body.fullName });
    if (customer) {
      res.send(customer);
      console.log('BACKEND: customer._id', customer._id)
      console.log('BACKEND: customer.name', customer.fullName)
      console.log('BACKEND: customer.email', customer.email)
    } else {
      res.status(404).send({ message: 'Customer Not Found' });
    }
  })
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      res.send(customer);
      console.log('customer._id', customer._id)
      console.log('customer.name', customer.fullName)
    } else {
      res.status(404).send({ message: 'Customer Not Found' });
    }
  })
)

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      customer.fullName = req.body.fullName || customer.fullName;
      customer.email = req.body.email || customer.email;
      customer.address = req.body.address || customer.address;
      customer.contact = req.body.contact || customer.contact;

      const updatedCustomer = await customer.save();
      
      res.send({ message: 'User Updated', customer: updatedCustomer });
    } else {
      res.status(404).send({ message: 'Customer Not Found' });
    }
  })
)


router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (customer) {
      if (customer) {
        const deleteCustomer = await customer.remove()
        console.log('deleted')
        res.send({ message: 'User Deleted', customer: deleteCustomer });
      }
    } else {
      res.status(404).send({ message: 'Customer Not Found' });
    }
  })
)

export default router