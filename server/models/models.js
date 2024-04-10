// const sequelize = require('../db')
// const {DataTypes} = require('sequelize')

import sequelize from '../db.js'
import {DataTypes} from 'sequelize'

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //surname: {type: DataTypes.STRING,},
    //name: {type: DataTypes.STRING,},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
   // number: {type: DataTypes.INTEGER, unique: true},
   //  role: {type: DataTypes.STRING, defaultValue: "USER"},
   //  roleID: {type: DataTypes.INTEGER, defaultValue: 0},
    // role: {type: DataTypes.BOOLEAN, defaultValue: "FALSE"},
})

const Role = sequelize.define('role',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Order = sequelize.define('order',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, allowNull: false},
    address: {type: DataTypes.STRING, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},
    status: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    comment: {type: DataTypes.STRING},
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('createdAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            const value = this.getDataValue('updatedAt')
            const day = value.getDate()
            const month = value.getMonth() + 1
            const year = value.getFullYear()
            const hours = value.getHours()
            const minutes = value.getMinutes()
            return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes
        }
    },
})

const OrderLine = sequelize.define('order_line',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER}
})

/*const OrderStatus = sequelize.define('order_status',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
})*/

const Product = sequelize.define('product',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER,allowNull: false, defaultValue: 0},
    description: {type: DataTypes.STRING(1000), allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING, allowNull: false},

})

const Category = sequelize.define('category',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    //subcategory_id: {type: DataTypes.INTEGER},
})

const Brand = sequelize.define('brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const ProductInfo = sequelize.define('product_info',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CartProduct = sequelize.define('cart_product', {
   // id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, defaultValue: 1},
})

const CategoryBrand = sequelize.define('category_brand',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasMany(Order, {as: 'orders', onDelete: 'SET NULL'})
Order.belongsTo(User)

Role.hasMany(User, {})
User.belongsTo(Role)

Order.hasMany(OrderLine, {as: 'items', onDelete: 'CASCADE'})
OrderLine.belongsTo(Order)

/*OrderStatus.hasMany(Order)
Order.belongsTo(OrderStatus)*/

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(OrderLine)
OrderLine.belongsTo(Product)

Product.hasMany(ProductInfo, {as: "info"})
ProductInfo.belongsTo(Product)

Category.hasMany(Category)
Category.belongsTo(Category)

Category.belongsToMany(Brand, {through: CategoryBrand})
Brand.belongsToMany(Category, {through: CategoryBrand})

Cart.belongsToMany(Product, { through: CartProduct, onDelete: 'CASCADE' })
Product.belongsToMany(Cart, { through: CartProduct, onDelete: 'CASCADE' })

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)
Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

export {
// 111 module.exports = {
    User,
    Role,
    Order,
    OrderLine,
    //OrderStatus,
    Product,
    Category,
    Brand,
    CategoryBrand,
    ProductInfo,
    Cart,
    CartProduct,
}