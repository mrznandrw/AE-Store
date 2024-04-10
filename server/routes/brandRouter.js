// 111 const Router = require('express')
// 111 const router = new Router()
// 111 const brandController = require('../controllers/brandController')
// 111 const checkRole = require('../middleware/checkRoleMiddleware')

import Router from 'express'
const router = new Router()
import brandController from '../controllers/brandController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

router.post('/', checkRole('ADMIN'), brandController.create)
router.get('/', brandController.getAll)
router.get('/:id', checkRole('ADMIN'), brandController.getOne)
router.put('/:id', checkRole('ADMIN'),  brandController.update)
router.delete('/:id', checkRole('ADMIN'), brandController.delete)

// 111 module.exports = router
export default router