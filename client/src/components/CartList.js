import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../index";
import {increment, decrement, remove, fetchCart} from '../http/cartAPI.js'
import {Table, Spinner, Button, Alert} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CartItem from "./CartItem";
import { observer } from 'mobx-react-lite'

const CartList = observer(() => {
    const { cart } = useContext(Context)
    const [fetching, setFetching] = useState(false)
    const [show, setShow] = useState(false);
    const {user, } = useContext(Context)

    useEffect(() => {
        fetchCart()
            .then(
                data => cart.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }, [])

    const navigate = useNavigate()

    const handleIncrement = (id) => {
        setFetching(true)
        increment(id)
            .then(
                data => cart.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleDecrement = (id) => {
        setFetching(true)
        decrement(id)
            .then(
                data => cart.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    const handleRemove = (id) => {
        setFetching(true)
        remove(id)
            .then(
                data => cart.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <>
            <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                Для оформления заказа авторизуйтесь
            </Alert>
            {cart.count ? (
                <>
                    <Table bordered hover size="sm" className="mt-3">
                        <thead>
                        <tr>
                            <th>Изображение</th>
                            <th>Наименование</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th>Сумма</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.products.map(item =>
                            <CartItem
                                key={item.id}
                                increment={handleIncrement}
                                decrement={handleDecrement}
                                remove={handleRemove}
                                {...item}
                            />
                        )}
                        <tr>
                            <th colSpan="4">Итого</th>
                            <th>{cart.sum} ₽</th>

                        </tr>
                        </tbody>
                    </Table>
                    <Button onClick={() => user.isAuth? navigate('/checkout') :setShow(true)}>Оформить заказ</Button>
                </>
            ) : (
                <p>Ваша корзина пуста</p>
            )}
        </>
    )
})

export default CartList