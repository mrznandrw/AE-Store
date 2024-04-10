// import { $authHost } from './index.js'
//
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

import { $authHost, $host } from './index.js'

export const fetchCart = async () => {
    const { data } = await $authHost.get('api/cart/getone')
    return data
}

export const append = async (id) => {
    const { data } = await $host.put(`api/cart/product/${id}/append/1`)
    return data
}

export const increment = async (id) => {
    const { data } = await $authHost.put(`api/cart/product/${id}/increment/1`)
    return data
}

export const decrement = async (id) => {
    const { data } = await $authHost.put(`api/cart/product/${id}/decrement/1`)
    return data
}

export const remove = async (id) => {
    const { data } = await $authHost.put(`api/cart/product/${id}/remove`)
    return data
}

export const clear = async () => {
    const { data } = await $authHost.put(`api/cart/clear`)
    return data
}