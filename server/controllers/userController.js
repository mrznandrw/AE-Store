// const ApiError = require('../error/ApiError')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const {User, Order, Product, ProductInfo} = require("../models/models")

import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User, Role, Order, Product, ProductInfo} from "../models/models.js"

const generateJwt = (id, email, roleId) => {
    return jwt.sign(
        {id, email, roleId},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )

}

class UserController {
    async registration(req, res, next) {
        const {email, password, /*number, name, surname,*/ roleId} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, roleId,/* name, surname, number,*/ password: hashPassword})
        //const order = await Order.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.roleId)
        return res.json({token})
    }

    async login(req, res, next) {

        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {

           throw new Error('Указан неверный пароль')

           // return next(ApiError.internal('Указан неверный пароль'))

        }
        const token = generateJwt(user.id, user.email, user.roleId)
        return res.json({token})

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.roleId)
        return res.json({token})
    }

    async delete(req,res) {
        const {id} = req.params
        let user = (await User.findOne({where: {id}})).name
         await User.destroy(
            {
                where: {id}
            }
        )
        return res.json(user + ' был удален')
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne(
            {
                where: {id},
            }
        )
        return res.json(user)
    }

    async getRole(req,res) {
        const {roleId} = req.body
        let userRole = await Role.findOne({where: {id: roleId}});
        return res.json(userRole.title)
    }
}

// 111 module.exports = new UserController()
export default new UserController()