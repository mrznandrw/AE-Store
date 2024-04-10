import express from 'express'
import orderController from '../controllers/orderController.js'
import authMiddleware from '../middleware/authMiddleware.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


// 111 const express = require('express')
// 111 const orderController = require('../controllers/orderController')
// 111 const authMiddleware = require('../middleware/authMiddleware')
// 111 const checkRole = require('../middleware/checkRoleMiddleware')

const router = new express.Router()

/*
 * только для администратора магазина
 */

// получить список всех заказов магазина
router.get(
    '/admin/getall',
    authMiddleware, checkRole('ADMIN'),
    orderController.adminGetAll
)
// получить список заказов пользователя
router.get(
    '/admin/getall/user/:id([0-9]+)',
    authMiddleware, checkRole('ADMIN'),
    orderController.adminGetUser
)
// получить заказ по id
router.get(
    '/admin/getone/:id([0-9]+)',
    authMiddleware, checkRole('ADMIN'),
    orderController.adminGetOne
)
// создать новый заказ
router.post(
    '/admin/create',
    authMiddleware, checkRole('ADMIN'),
    orderController.adminCreate
)
// удалить заказ по id
router.delete(
    '/admin/delete/:id([0-9]+)',
    authMiddleware, checkRole('ADMIN'),
    orderController.adminDelete
)

/*
 * для авторизованного пользователя
 */

// получить все заказы пользователя
router.get(
    '/user/getall',
    authMiddleware,
    orderController.userGetAll
)
// получить один заказ пользователя
router.get(
    '/user/getone/:id([0-9]+)',
    authMiddleware,
    orderController.userGetOne
)
// создать новый заказ
router.post(
    '/user/create',
    authMiddleware,
    orderController.userCreate
)

/*
 * для неавторизованного пользователя
 */

// создать новый заказ
router.post(
    '/guest/create',
    orderController.guestCreate
)

// 111 module.exports = router
export default router