// 111 const Router = require('express')
// 111 const router = new Router()
// 111 const categoryController = require('../controllers/categoryController')
// 111 const checkRole = require('../middleware/checkRoleMiddleware')

import Router from 'express'
const router = new Router()
import categoryController from '../controllers/categoryController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

router.post('/', checkRole('ADMIN'), categoryController.create)
router.get('/', categoryController.getAll)
router.get('/:id', checkRole('ADMIN'), categoryController.getOne)
router.put('/:id', checkRole('ADMIN'),  categoryController.update)
router.delete('/:id', checkRole('ADMIN'), categoryController.delete)



// 111 module.exports = router
export default router