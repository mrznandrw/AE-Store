// 111 const { Cart } = require ('./models.js')
// 111 const { Product } = require ('./models.js')
// 111 const { CartProduct } = require ('./models.js')

import { Cart } from './models.js'
import { Product } from './models.js'
import { CartProduct } from './models.js'

//import ApiError from '../error/ApiError.js'


const pretty = (cart) => {
    const data = {}
    data.id = cart.id
    data.products = []
    if (cart.products) {
        data.products = cart.products.map(item => {
            return {
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.cart_product.quantity
            }
        })
    }
    return data
}

class CartModel /*Model*/ {
    async getOne(cartId) {
        let cart = await Cart.findByPk(cartId, {
            attributes: ['id'],
            include: [
                {model: Product, attributes: ['id', 'image', 'name', 'price']},
            ],
        })
        if (!cart) {
            cart = await Cart.create()
        }

        return pretty(cart)
    }

    async create() {
        const cart = await Cart.create()
        return pretty(cart)
    }

     async append(cartId, productId, quantity) {
        let cart = await Cart.findByPk(cartId, {
            attributes: ['id'],
            include: [
                {model: Product, attributes: ['id', 'image', 'name', 'price']},
            ]
        })
        if (!cart) {
            cart = await Cart.create()
        }
        // проверяем, есть ли уже этот товар в корзине
        const cart_product = await CartProduct.findOne({
            where: {cartId, productId}
        })
        if (cart_product) { // есть в корзине
            await cart_product.increment('quantity', {by: quantity})
        } else { // нет в корзине
            await CartProduct.create({cartId, productId, quantity})
        }
        // обновим объект корзины, чтобы вернуть свежие данные
        await cart.reload()
        return pretty(cart)
        //return cart
    }

    async increment(cartId, productId, quantity) {
        let cart = await Cart.findByPk(cartId, {
            include: [{model: Product, as: 'products'}]
        })
        if (!cart) {
            cart = await Cart.create()
        }
        // проверяем, есть ли этот товар в корзине
        const cart_product = await CartProduct.findOne({
            where: {cartId, productId}
        })
        if (cart_product) {
            await cart_product.increment('quantity', {by: quantity})
            // обновим объект корзины, чтобы вернуть свежие данные
            await cart.reload()
        }
        return pretty(cart)
    }

    async decrement(cartId, productId, quantity) {
        let cart = await Cart.findByPk(cartId, {
            include: [{model: Product, as: 'products'}]
        })
        if (!cart) {
            cart = await Cart.create()
        }
        // проверяем, есть ли этот товар в корзине
        const cart_product = await CartProduct.findOne({
            where: {cartId, productId}
        })
        if (cart_product) {
            if (cart_product.quantity > quantity) {
                await cart_product.decrement('quantity', {by: quantity})
            } else {
                await cart_product.destroy()
            }
            // обновим объект корзины, чтобы вернуть свежие данные
            await cart.reload()
        }
        return pretty(cart)
    }

    async remove(cartId, productId) {
        let cart = await Cart.findByPk(cartId, {
            include: [{model: Product, as: 'products'}]
        })
        if (!cart) {
            cart = await Cart.create()
        }
        // проверяем, есть ли этот товар в корзине
        const cart_product = await CartProduct.findOne({
            where: {cartId, productId}
        })
        if (cart_product) {
            await cart_product.destroy()
            // обновим объект корзины, чтобы вернуть свежие данные
            await cart.reload()
        }
        return pretty(cart)
    }

    async clear(cartId) {
        let cart = await Cart.findByPk(cartId, {
            include: [{model: Product, as: 'products'}]
        })
        if (cart) {
            await CartProduct.destroy({where: {cartId}})
            // обновим объект корзины, чтобы вернуть свежие данные
            await cart.reload()
        } else {
            cart = await Cart.create()
        }
        return pretty(cart)
    }

    async delete(cartId) {
        const cart = await Cart.findByPk(cartId, {
            include: [{model: Product, as: 'products'}]
        })
        if (!cart) {
            throw new Error('Корзина не найдена в БД')
        }
        await cart.destroy()
        return pretty(cart)
    }
}

// 111 module.exports = new CartModel()
export default new CartModel()