// const uuid = require('uuid')
// const path = require('path');
// const {Product, ProductInfo, Brand} = require('../models/models')
// const ApiError = require('../error/ApiError')

//import uuid from 'uuid'
import * as uuid from "uuid";
import * as path from  'path'
import {Product, ProductInfo, Brand} from '../models/models.js'
import ApiError from '../error/ApiError.js'
import * as fs from "fs";
import {Op} from "sequelize";

class ProductController {
    async create(req, res, next) {
        try {
            let {name, price,description, title, quantity, brandId, categoryId, info} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
             image.mv(path.resolve('static', fileName))
            const product = await Product.create({name, price, quantity, description, title, brandId, categoryId, image: fileName})
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {brandId, categoryId, request, page, limit,} = req.query
        page = page || 1
        limit = limit || 5
        let offset = page * limit - limit
        let products;
        if (!brandId && !categoryId && !request) {
            products = await Product.findAndCountAll({limit, offset})
        }
        if (brandId && !categoryId && !request) {
            products = await Product.findAndCountAll({where:{brandId}, limit, offset})
        }

        if (!brandId && categoryId && !request) {
            products = await Product.findAndCountAll({where:{categoryId}, limit, offset})
        }

        if (brandId && categoryId && !request) {
            products = await Product.findAndCountAll({where:{categoryId, brandId}, limit, offset})
        }
        if (!brandId && !categoryId && request) {
            products = await Product.findAndCountAll({where:{name: { [Op.iLike]: `%${request}%`}}, limit, offset})
        }
        if (brandId && !categoryId && request) {
            products = await Product.findAndCountAll({where: {brandId, name: { [Op.iLike]: `%${request}%`}}, limit, offset})
        }
        return res.json(products)
    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            }
        )
        return res.json(product)
    }

    // async update(req,res, next) {
    //     try {
    //         const {id} = req.params
    //         let {name, price,description, title, quantity, brandId, categoryId, info} = req.body
    //         const {image} = req.files
    //         let fileName = uuid.v4() + ".jpg"
    //         await image.mv(path.resolve(__dirname, '..', 'static', fileName))
    //         const product = await Product.findByPk(
    //             {
    //                 where: {id},
    //                 //include: [{model: ProductInfo, as: 'info'}]
    //             }
    //             )
    //         await product.update({name, price, quantity, description, title, brandId, categoryId, image: fileName})
    //
    //         // if (info) {
    //         //     info = JSON.parse(info)
    //         //     info.forEach(i =>
    //         //         ProductInfo.update({
    //         //             title: i.title,
    //         //             description: i.description,
    //         //             productId: product.id
    //         //         })
    //         //     )
    //         // }
    //
    //         return res.json(product)
    //     } catch (e) {
    //         next(ApiError.badRequest(e.message))
    //     }
    // }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            //const product = await ProductModel.update(req.params.id, req.body, req.files?.image)
            //--------------------------------------------------------------
            const id = req.params.id
            const data = req.body
            let fileName = null
            //const img =  req.files?.image
            const product = await Product.findByPk(id, {
                include: [{model: ProductInfo, as: 'info'}]
            })
            if (!product) {
                throw new Error('Товар не найден в БД')
            }
            // пробуем сохранить изображение, если оно было загружено
            //const file = FileService.save(img)
            const img = req.files?.image
            if (!img){
                fileName = null
            }
            else {
                fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve('static', fileName))
            }
            // если загружено новое изображение — надо удалить старое
             if (fileName && product.image) {
                 //fs.unlink(`static/${product.image}`)
                 //FileService.delete(product.image)
                 const filePath = path.resolve('static', product.image)
                 if (fs.existsSync(filePath)) {
                     fs.unlinkSync(filePath)
                 }
             }
            // подготавливаем данные, которые надо обновить в базе данных
            const {

                name = product.name,
                price = product.price,
                categoryId = product.categoryId,
                brandId = product.brandId,
                quantity = product.quantity,
                description = product.description,
                title = product.title,
                image = fileName ? fileName : product.image
            } = data
            await product.update({name, price, categoryId, image, brandId, quantity, description, title,})
            if (data.props) { // свойства товара
                // удаляем старые и добавляем новые
                await ProductInfo.destroy({where: {productId: id}})
                const props = JSON.parse(data.props)
                for (let prop of props) {
                    await ProductInfo.create({
                        title: prop.title,
                        description: prop.description,
                        productId: product.id
                    })
                }
            }
            // обновим объект товара, чтобы вернуть свежие данные
            await product.reload()

            //--------------------------------------------------------------
            res.json(product)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }



    async delete(req,res) {
        const {id} = req.params
        const product = await Product.findByPk(id)
        await ProductInfo.destroy({where: {productId: id},})
        await Product.destroy({where: {id}})
        return res.json(product)
    }


    async createInfo(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            //const property = await ProductPropModel.create(req.params.productId, req.body)
            const productId = req.params.productId
            const product = await Product.findByPk(productId)
            if (!product) {
                throw new Error('Товар не найден в БД')
            }
            const {title, description} = req.body
            const info = await ProductInfo.create({title, description, productId})
            res.json(info)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateInfo(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            if (!req.params.id) {
                throw new Error('Не указано id свойства')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            //const property = await ProductPropModel.update(req.params.productId, req.params.id, req.body)
            const productId = req.params.productId
            const id = req.params.id
            const product = await Product.findByPk(productId)
            if (!product) {
                throw new Error('Товар не найден в БД')
            }
            const info = await ProductInfo.findOne({where: {productId, id}})
            if (!info) {
                throw new Error('Свойство товара не найдено в БД')
            }
            const {title = info.title, description = info.description} = req.body
            await info.update({title, description})
            res.json(info)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteInfo(req, res, next) {
        try {
            if (!req.params.productId) {
                throw new Error('Не указан id товара')
            }
            if (!req.params.id) {
                throw new Error('Не указано id свойства')
            }
            //const property = await ProductPropModel.delete(req.params.productId, req.params.id)
            const productId = req.params.productId
            const id = req.params.id
            const product = await Product.findByPk(productId)
            if (!product) {
                throw new Error('Товар не найден в БД')
            }
            const info = await ProductInfo.findOne({where: {productId, id}})
            if (!info) {
                throw new Error('Свойство товара не найдено в БД')
            }
            await info.destroy()
            res.json(info)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }


}

// 111 module.exports = new ProductController()
export default new ProductController()