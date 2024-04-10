// import { makeAutoObservable } from 'mobx'
//
// class CartStore {
//   //  _products = []
//
//     constructor() {
//         this._products = []
//         makeAutoObservable(this)
//     }
//
//     get products() {
//         return this._products
//     }
//
//     get count() { // всего позиций в корзине
//         return this._products.length
//     }
//
//     get sum() { // стоимость всех товаров корзины
//         return this._products.reduce((sum, item) => sum + item.price * item.quantity, 0)
//     }
//
//     set products(products) {
//         this._products = products
//     }
// }
//
// export default CartStore

import { makeAutoObservable } from 'mobx'

class CartStore {
    _products = []

    constructor() {
       //this._products = []
        makeAutoObservable(this)
    }

    get products() {
        return this._products
    }

    get count() { // всего позиций в корзине
        return this._products.length
    }

    get sum() { // стоимость всех товаров корзины
        return this._products.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }

    set products(products) {
        this._products = products
    }
}

export default CartStore