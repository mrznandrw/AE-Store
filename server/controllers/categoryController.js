// 111 const {Category, Product, ProductInfo} = require('../models/models')
// 111 const ApiError = require('../error/ApiError')

import {Category, Product, ProductInfo} from '../models/models.js'
import ApiError from '../error/ApiError.js'

class CategoryController {
    async create(req, res) {
        const {name,categoryId} = req.body
        const category = await Category.create({name, categoryId})
        return res.json(category)
    }

    async getAll(req, res) {
        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getOne(req, res) {
        const {id} = req.params
        const category = await Category.findByPk(id)
        return res.json(category)
    }

    async update(req,res) {
        const {id} = req.params
        const {name,categoryId} = req.body
        const category = await Category.findByPk(id)
        await category.update({name, categoryId})
        return res.json(category)
    }

    async delete(req,res) {
        const {id} = req.params
        const category = await Category.findByPk(id)
        await category.destroy()
        return res.json(category)
    }


}

// 111 module.exports = new CategoryController()
export default new CategoryController()