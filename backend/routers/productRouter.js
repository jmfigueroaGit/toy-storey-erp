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
  const product = new Product({
    productId: req.body.productId,
    productName: req.body.productName,
    category: req.body.category,
    supplier: req.body.supplier,
    price: req.body.price,
    quantity: req.body.quantity,
  });

  const newProduct = await product.save();
  res.send(product);
});

router.get("/readProduct", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
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