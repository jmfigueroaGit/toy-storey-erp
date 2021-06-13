import express from 'express'
import asyncHandler from 'express-async-handler'
import Quotation from '../models/quotationModel.js'
import Customer from '../models/customerModel.js'
import Product from '../models/productModel.js'
import Cart from '../models/cartItemsModel.js'

const router = express.Router()

// @desc    get all quotations
// @route   /api/sales/quotations
router.get(
  '/quotations/',
  asyncHandler(async (req, res) => {
    const quotations = await Quotation.find({})
    if(quotations) {
      res.json(quotations)
    } else {
      res.status(500)
    }
  })
)

// @desc    cart items
// @route   /api/sales/quotations/new/:productId
// router.post(
//   `/:productId`,
//   asyncHandler(async (req, res) => {
//     const { qty, unitPrice } = req.body

//     const product = await Product.findOne({ 'productId': req.params.productId });
//     if (product) {
//       const cart = await Cart.create({
//         productId: product.productId,
//         productName: product.productName,
//         quantity: qty,
//         unitPrice: unitPrice,
//         subTotal: qty * unitPrice, 
//       })
//       if(cart) {
//         res.send({
//           productName: cart.productName,
//           quantity: cart.quantity,
//           unitPrice: cart.unitPrice,
//           subTotal: cart.subTotal
//         });
//       }
//       console.log('BACKEND: product._id', product._id)
//       console.log('BACKEND: product.productName', product.productName)
//     } else {
//       res.status(404).send({ message: 'Product Not Found' });
//     }
//   })
// )

// @desc    create new quotation
// @route   /api/sales/quotations/new
router.post(
  '/quotations/new',
  asyncHandler(async (req, res) => {

    const customer = await Customer.findOne({ 'fullName': req.body.name })

    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Order line is empty' });
    } else {
      if(customer) {

        const order = await Quotation.create({
          customer: req.body.name,
          invoiceAddress: customer.email,
          deliveryAddress: customer.address,
          orderItems: req.body.orderItems,
          itemsPrice: req.body.itemsPrice,
          shippingFee: req.body.shippingFee,
          totalPrice: req.body.totalPrice,
        });
        const createdQuotation = await order.save();
        res
          .status(201)
          .send({ message: 'New Order Created', quotation: createdQuotation });
      } else {
        if (req.body.name) {
          res.status(404).send({ message : 'Customer does not exist. Add them now on your list.'})
        } else{
          res.status(400).send({ message: 'Enter a valid customer name.' })
        }
      }
    }
  })
)

// @desc    get quotation details
// @route   /api/sales/quotations
router.get(
  '/quotations/:id',
  asyncHandler(async (req, res) => {
    const quote = await Quotation.findById(req.params.id);
    if (quote) {
      res.send(quote);
    } else {
      res.status(404).send({ message: 'Quote Not Found' });
    }
  })
);

// @desc    delete a quotation
// @route   /api/sales/quotations
router.delete(
  '/quotations/:id',
  asyncHandler(async (req, res) => {
    const quote = await Quotation.findById(req.params.id);
    if (quote) {
      const deleteQuote = await quote.remove();
      res.send({ message: 'Quote Deleted', quote: deleteQuote });
    } else {
      res.status(404).send({ message: 'Quote Not Found' });
    }
  })
);

// @desc    mark quotation paid
// @route   /api/sales/quotations/:id/deliver
router.put(
  '/quotations/:id/pay',
  asyncHandler(async (req, res) => {
    const quote = await Quotation.findById(req.params.id);
    if (quote) {
      quote.isPaid = true;
      quote.paidAt = Date.now();
     
      const updatedQuote = await quote.save();
      res.send({ message: 'Order Paid', quote: updatedQuote });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// @desc    deliver quotation
// @route   /api/sales/quotations/:id/deliver
router.put(
  '/quotations/:id/deliver',
  asyncHandler(async (req, res) => {
    const quote = await Quotation.findById(req.params.id);
    if (quote) {
      quote.isDelivered = true;
      quote.deliveredAt = Date.now();

      const updatedQuote = await quote.save();
      res.send({ message: 'Order Delivered', quote: updatedQuote });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

// @desc    edit/update a quotation
// @route   /api/sales/quotations/:id/edit


// @desc    Get Product Details by ProductID for add to cart
// @route /api/sales/quotation/add/:productId
router.get(
  '/quotations/add/:productId',
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ 'productId': req.params.productId });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
)

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const sales = await Quotation.find({ isPaid: 'true'});
    if (sales) {
      res.json(sales);
    } else {
      res.status(500);
    }
  })
);

export default router