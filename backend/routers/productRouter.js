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

export default router