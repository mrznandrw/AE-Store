// const {Brand, Category, Product, ProductInfo} = require('../models/models')
// const ApiError = require('../error/ApiError')

import {Brand, Category, Product, ProductInfo} from '../models/models.js'
import ApiError from '../error/ApiError.js'

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async getOne(req, res) {
        const {id} = req.params
        const brand = await Brand.findByPk(id)
        return res.json(brand)
    }

    async update(req,res) {
        const {id} = req.params
        const brand = await Brand.findByPk(id)
        const {name} = req.body
       // let {name= brand.name} = req.body
        await brand.update({name})
        return res.json(brand)
    }

    async delete(req,res) {
        const {id} = req.params
        const brand = await Brand.findByPk(id)
        await brand.destroy()
        return res.json(brand)
    }

}

// 111 module.exports = new BrandController()
export default new BrandController()