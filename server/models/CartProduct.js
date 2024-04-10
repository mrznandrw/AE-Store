import { CartProduct as BasketProductMapping } from './models.js'
import { Cart as BasketMapping } from './models.js'
import ApiError from '../error/ApiError.js'

class CartProduct {
    async getAll(basketId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        const items = await BasketProductMapping.findAll({where: {basketId}})
        return items
    }

    async getOne(basketId, productId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId}})
        if (!item) {
            throw new Error('Товара нет в корзине')
        }
        return item
    }

    async create(basketId, data) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        const {quantity = 1} = data
        const item = await BasketProductMapping.create({basketId, productId, quantity})
        return item
    }

    async update(basketId, productId, data) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId}})
        if (!item) {
            throw new Error('Товара нет в корзине')
        }
        if (data.quantity) {
            await item.update({quantity})
        } else if (data.increment) {
            await item.increment('quantity', {by: data.increment})
        } else if (data.decrement) {
            await item.decrement('quantity', {by: data.decrement})
        }
        return item
    }

    async delete(basketId, productId) {
        const basket = await BasketMapping.findByPk(basketId)
        if (!basket) {
            throw new Error('Корзина не найдена в БД')
        }
        const item = await BasketProductMapping.findOne({where: {basketId, productId}})
        if (!item) {
            throw new Error('Товара нет в корзине')
        }
        await item.destroy()
        return item
    }
}

export default new CartProduct()