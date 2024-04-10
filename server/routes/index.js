// 111 const Router = require('express')
// 111 const router = new Router()
// 111 const productRouter = require('./productRouter')
// 111 const userRouter = require('./userRouter')
// 111 const brandRouter = require('./brandRouter')
// 111 const categoryRouter = require('./categoryRouter')
// 111 const cartRouter= require('./cartRouter')

import Router from 'express'
const router = new Router()
import productRouter from './productRouter.js'
import userRouter from './userRouter.js'
import brandRouter from './brandRouter.js'
import categoryRouter from './categoryRouter.js'
import cartRouter from'./cartRouter.js'
import orderRouter from "./orderRouter.js";

router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/order', orderRouter)

// 111 module.exports = router
export default router