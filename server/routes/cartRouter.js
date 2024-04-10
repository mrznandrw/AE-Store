// const Router = require('express')
// const router = new Router()
//
// const cartController = require('../controllers/cartController')
//
// // ------- Добавил проверку на авторизацию для того, чтобы вытащить оттуда авторизованного юзера -------- //
// const authMiddleware = require('../middleware/authMiddleware')
//
// // ------- CRUD корзины ------- //
// router.get('/', authMiddleware , cartController.getCartUser)
// router.post('/', authMiddleware , cartController.addToCart)
// router.post('/delete' , cartController.deleteCart)
//
// //router.get('/' , cartController.getCartUser)
// //router.post('/' , cartController.addToCart)
// //router.post('/delete' , cartController.deleteCart)
//
//
// module.exports = router

import Router from 'express'
//  111 const Router = require('express')
const router = new Router()

// 111 const cartController = require('../controllers/cartController.js')
// 111 const authMiddleware = require('../middleware/authMiddleware')

import cartController from '../controllers/cartController.js'
import authMiddleware from '../middleware/authMiddleware.js'

router.get('/getone', cartController.getOne)
router.put('/product/:productId([0-9]+)/append/:quantity([0-9]+)', cartController.append)
router.put('/product/:productId([0-9]+)/increment/:quantity([0-9]+)', cartController.increment)
router.put('/product/:productId([0-9]+)/decrement/:quantity([0-9]+)', cartController.decrement)
router.put('/product/:productId([0-9]+)/remove', cartController.remove)
router.put('/clear', authMiddleware, cartController.clear)

// 111 module.exports = router
export default router