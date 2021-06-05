import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js';
import quotationRouter from './routers/quotationRouter.js'

dotenv.config()
const app = express()

try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    })

    console.log(`Mongo DB Connected: ${db.connection.host}`)
} catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/inventory', productRouter)
app.use('/api/sales/customerlist', userRouter)
app.use('/api/sales/quotations', quotationRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))