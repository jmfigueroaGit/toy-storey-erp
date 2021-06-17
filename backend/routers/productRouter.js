import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const router = express.Router()

router.get(
  "/productlist", 
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
)

router.post("/addProduct", async (req, res) => {
  const productExists = await Product.findOne({ productId: 'req.body.productId' })
  if (productExists) {
    res.send({ message: "Product Exists" })
  } 
  
  const product = await Product.create({
    productId: req.body.productId,
    productName: req.body.productName,
    category: req.body.category,
    supplier: req.body.supplier,
    price: req.body.price,
    quantity: req.body.quantity,
  });
  if (product) {
    res.send(product);
  } else {
    res.status(500).send({ message: 'Add Product Failed. Try Again.'})
  }
});

router.post("/updateProduct", async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { productId: req.body.productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.send(product);
});

export default router