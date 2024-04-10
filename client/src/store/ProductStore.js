import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._categories = []
        this._brands = []
        this._carts = []
        this._products = []
        this._selectedCategory = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0    //общее кол-во товаров по запросу
        this._limit = 5 //кол-во товаров на одной странице
        makeAutoObservable(this)
    }

    setCategories(categories) {
        this._categories = categories
    }
    setBrands(brands) {
        this._brands = brands
    }
    setProducts(products) {
        this._products = products
    }
    setCarts(cart){
        this._carts = cart
    }

    setSelectedCategory(category) {
        this.setPage(1)
        this._selectedCategory = category
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get categories() {
        return this._categories
    }
    get brands() {
        return this._brands
    }
    get products() {
        return this._products
    }
    get cart() {
        return this._carts
    }
    get selectedCategory() {
        return this._selectedCategory
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}