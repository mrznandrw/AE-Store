// 111 const Router = require('express')
// 111 const router = new Router()
// 111 const userController = require('../controllers/userController')
// 111 const authMiddleware = require('../middleware/authMiddleware')

import Router from 'express'
const router = new Router()
import userController from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/:id', userController.getOne)
router.delete('/:id', userController.delete)
router.post('/role', userController.getRole)

// 111 module.exports = router
export default router