import express from 'express'
import asyncHandler from 'express-async-handler'
import Quotation from '../models/quotationModel.js'
import Product from '../models/productModel.js'
import Cart from '../models/cartItemsModel.js'

const router = express.Router()

// @desc    get all quotations
// @route   /api/sales/quotations
router.get(
  '/',
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
  '/new',
  asyncHandler(async (req, res) => {
    const { 
      customer,
      invoiceAddress,
      deliveryAddress,
      orderItems,
      itemsPrice,
      shippingFee,
      totalPrice,
   } = req.body

    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Order line is empty' });
    } else {
      const order = await Quotation.create({
        customer,
        invoiceAddress,
        orderItems,
        deliveryAddress,
        itemsPrice,
        shippingFee,
        totalPrice,
      });
      const createdQuotation = await order.save();
      res
        .status(201)
        .send({ message: 'New Order Created', quotation: createdQuotation });
    }
  })
)

// @desc    get quotation details
// @route   /api/sales/quotations
router.get(
  '/:id',
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
  '/:id',
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
  '/:id/pay',
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
  '/:id/deliver',
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


// @desc    Get Product Details by ProductID
// @route /api/sales/quotation/:productId
router.get(
  '/add/:productId',
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ 'productId': req.params.productId });
    if (product) {
      res.send(product);
      console.log('BACKEND: product._id', product._id)
      console.log('BACKEND: product.productName', product.productName)
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
)


export default router