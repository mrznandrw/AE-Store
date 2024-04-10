import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}
export const updateCategory = async (id, category) => {
    const { data } = await $authHost.put('api/category/' + id, category)
    return data
}
export const fetchCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}
export const fetchCategory = async (id) => {
    const { data } = await $authHost.get('api/category/' + id)
    return data
}
export const removeCategory = async (id) => {
    const {data} = await $authHost.delete('api/category/' + id)
    return data
}
export const deleteCategory = async (id) => {
    const { data } = await $authHost.delete('api/category/' + id)
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}
export const updateBrand = async (id, brand) => {
    const { data } = await $authHost.put('api/brand/' + id, brand)
    return data
}
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}
export const fetchBrand = async (id) => {
    const { data } = await $authHost.get('api/brand/' + id)
    return data
}
export const removeBrand = async (id) => {
    const {data} = await $authHost.delete('api/brand/' + id)
    return data
}
export const deleteBrand = async (id) => {
    const { data } = await $authHost.delete('api/brand/' + id)
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product)
    return data
}

export const fetchProducts = async (categoryId, brandId,request, page, limit=5) => {
    const {data} = await $host.get('api/product', {params: {
            categoryId, brandId, request, page, limit
        }})
    return data
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id)
    return data
}
export const updateProduct = async (id, product) => {
    const {data} = await $authHost.put('api/product/' + id, product)
    return data
}
export const deleteProduct = async (id) => {
    const { data } = await $authHost.delete(`api/product/` + id)
    return data
}


/*
 * Создание, обновление и удаление характеристик товара
 */
export const createProperty = async (productId, property) => {
    const { data } = await $authHost.post(`api/product/${productId}/create`, property)
    return data
}

export const updateProperty = async (productId, id, property) => {
    const { data } = await $authHost.put(`api/product/${productId}/update/${id}`, property)
    return data
}

export const deleteProperty = async (productId, id) => {
    const { data } = await $authHost.delete(`api/product/${productId}/delete/${id}`)
    return data
}
// export const addToCart = async (productId) => {
//     const {response} = await $authHost.post('api/cart', productId)
//     return response
// }
//
// export const deleteFromCart = async (id) => {
//     const {response} = await $authHost.post('api/cart/delete', {id:id})
//     return response
// }
//
// export const getCart = async () => {
//     const {data} = await $authHost.get('api/cart')
//     return data
// }