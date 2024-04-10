// 111  const {Cart, Product,CartProduct, ProductInfo} = require('../models/models')
//const {CartModel} = require ("../models/CartModel");
// class cartController {
//     // ------ CRUD корзины ------ //
//
//     async addToCart(req,res,next){
//         console.log(req.body)
//         const user = req.user.id
//         const {productId, } = req.body
//        const cart = await CartProduct.create({cartId : user.id, productId : productId})
//         //const cart = await CartProduct.create({cartId,  productId})
//         return res.json(cart)
//     }
//
//     async getCartUser(req,res){
//         const {id} = req.user
//         const cart = await CartProduct.findAll({include: {
//                 model: Product
//             }, where: {cartId: id}})
//         if(!cart) res.status(400).json('None Id')
//         return res.json(cart)
//     }
//
//     async deleteCart (req, res) {
//         const {id} = req.body
//         if(!id) res.status(400).json('None Id')
//         await CartProduct.destroy({where: {id: id}})
//         res.status(200).json('Product deleted')
//     }
//
// }
//import CartModel from '../models/CartModel.js'
// 111 const {ApiError} = require( '../error/ApiError.js')
import CartModel from '../models/CartModel.js' // 111
//import ProductModel from '../models/Product.js'
import ApiError from '../error/ApiError.js' // 111
import {Cart, CartProduct, Product} from "../models/models.js"; // 111

const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true

class cartController {
    async getOne(req, res, next) {
        try {
            let cart
            if (req.signedCookies.cartId) {
                cart = await CartModel.getOne(parseInt(req.signedCookies.cartId))
            } else {
                cart = await CartModel.create()//Cart.create()
            }
                res.cookie('cartId', cart.id, {maxAge, signed})
                res.json(cart)
            } catch(e) {
            next(ApiError.badRequest(e.message))
       }
    }

    async append(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const {productId, quantity} = req.params
            //const cart =  await cartController.pappend(cartId, productId, quantity)
            const cart = await CartModel.append(cartId, productId, quantity)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async increment(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const {productId, quantity} = req.params
            const cart = await CartModel.increment(cartId, productId, quantity)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async decrement(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const {productId, quantity} = req.params
            const cart = await CartModel.decrement(cartId, productId, quantity)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async remove(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const cart = await CartModel.remove(cartId, req.params.productId)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async clear(req, res, next) {
        try {
            let cartId
            if (!req.signedCookies.cartId) {
                let created = await CartModel.create()
                cartId = created.id
            } else {
                cartId = parseInt(req.signedCookies.cartId)
            }
            const cart = await CartModel.clear(cartId)
            res.cookie('cartId', cart.id, {maxAge, signed})
            res.json(cart)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

//---------------------------------------------------------------
// 111

// const pretty = (cart) => {
//     const data = {}
//     data.id = cart.id
//     data.products = []
//     if (cart.products) {
//         data.products = cart.products.map(item => {
//             return {
//                 id: item.id,
//                 name: item.name,
//                 image: item.image,
//                 price: item.price,
//                 quantity: item.cart_product.quantity
//             }
//         })
//     }
//     return data
// }
//
// class CartModel /*Model*/ {
//     static async getOne(cartId) {
//         console.log("A")
//         let cart = await Cart.findByPk(cartId, {
//             attributes: ['id'],
//             include: [
//                 {model: Product, attributes: ['id', 'image', 'name', 'price']},
//             ],
//         })
//         console.log("B")
//         if (!cart) {
//             console.log("C")
//             cart = await Cart.create()
//         }
//         console.log("D")
//
//         return pretty(cart)
//     }
//
//     async create() {
//         const cart = await Cart.create()
//         return pretty(cart)
//     }
//
//     static async pappend(cartId, productId, quantity) {
//         let cart = await Cart.findByPk(cartId, {
//             attributes: ['id'],
//             include: [
//                 {model: Product, attributes: ['id', 'image', 'name', 'price']},
//             ]
//         })
//         if (!cart) {
//             cart = await Cart.create()
//             console.log(111)
//         }
//         // проверяем, есть ли уже этот товар в корзине
//         const cart_product = await CartProduct.findOne({
//             where: {cartId, productId}
//         })
//         if (cart_product) { // есть в корзине
//             await cart_product.increment('quantity', {by: quantity})
//         } else { // нет в корзине
//             await CartProduct.create({cartId, productId, quantity})
//             console.log(111)
//         }
//         // обновим объект корзины, чтобы вернуть свежие данные
//         await cart.reload()
//         return pretty(cart)
//         //return cart
//     }
//
//     static async increment(cartId, productId, quantity) {
//         let cart = await Cart.findByPk(cartId, {
//             include: [{model: Product, as: 'products'}]
//         })
//         if (!cart) {
//             cart = await Cart.create()
//         }
//         // проверяем, есть ли этот товар в корзине
//         const cart_product = await CartProduct.findOne({
//             where: {cartId, productId}
//         })
//         if (cart_product) {
//             await cart_product.increment('quantity', {by: quantity})
//             // обновим объект корзины, чтобы вернуть свежие данные
//             await cart.reload()
//         }
//         return pretty(cart)
//     }
//
//     static async decrement(cartId, productId, quantity) {
//         let cart = await Cart.findByPk(cartId, {
//             include: [{model: Product, as: 'products'}]
//         })
//         if (!cart) {
//             cart = await Cart.create()
//         }
//         // проверяем, есть ли этот товар в корзине
//         const cart_product = await CartProduct.findOne({
//             where: {cartId, productId}
//         })
//         if (cart_product) {
//             if (cart_product.quantity > quantity) {
//                 await cart_product.decrement('quantity', {by: quantity})
//             } else {
//                 await cart_product.destroy()
//             }
//             // обновим объект корзины, чтобы вернуть свежие данные
//             await cart.reload()
//         }
//         return pretty(cart)
//     }
//
//     static async remove(cartId, productId) {
//         let cart = await Cart.findByPk(cartId, {
//             include: [{model: Product, as: 'products'}]
//         })
//         if (!cart) {
//             cart = await Cart.create()
//         }
//         // проверяем, есть ли этот товар в корзине
//         const cart_product = await CartProduct.findOne({
//             where: {cartId, productId}
//         })
//         if (cart_product) {
//             await cart_product.destroy()
//             // обновим объект корзины, чтобы вернуть свежие данные
//             await cart.reload()
//         }
//         return pretty(cart)
//     }
//
//     static async clear(cartId) {
//         let cart = await Cart.findByPk(cartId, {
//             include: [{model: Product, as: 'products'}]
//         })
//         if (cart) {
//             await CartProduct.destroy({where: {cartId}})
//             // обновим объект корзины, чтобы вернуть свежие данные
//             await cart.reload()
//         } else {
//             cart = await Cart.create()
//         }
//         return pretty(cart)
//     }
//
//     static async delete(cartId) {
//         const cart = await Cart.findByPk(cartId, {
//             include: [{model: Product, as: 'products'}]
//         })
//         if (!cart) {
//             throw new Error('Корзина не найдена в БД')
//         }
//         await cart.destroy()
//         return pretty(cart)
//     }
// }


//---------------------------------------------------------------

//module.exports = new cartController()
export default new cartController()
