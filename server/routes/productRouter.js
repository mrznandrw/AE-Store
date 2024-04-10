// 111 const Router = require('express')
// 111 const router = new Router()
// 111 const productController = require('../controllers/productController')
// 111 const checkRole = require('../middleware/checkRoleMiddleware')

import Router from 'express'
const router = new Router()
import productController from '../controllers/productController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'
import authMiddleware from "../middleware/authMiddleware.js";

router.post('/', checkRole('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.put('/:id', checkRole('ADMIN'),  productController.update)
router.delete('/:id', checkRole('ADMIN'), productController.delete)

// создать свойство товара
router.post(
    '/:productId([0-9]+)/create',
    authMiddleware,
    checkRole('ADMIN'),
    productController.createInfo
)
// обновить свойство товара
router.put(
    '/:productId([0-9]+)/update/:id([0-9]+)',
    authMiddleware,
    checkRole('ADMIN'),
    productController.updateInfo
)
// удалить свойство товара
router.delete(
    '/:productId([0-9]+)/delete/:id([0-9]+)',
    authMiddleware,
    checkRole('ADMIN'),
    productController.deleteInfo
)


// 111 module.exports = router
export default router