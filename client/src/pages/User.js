import { Container, Button } from 'react-bootstrap'
import {useContext, useEffect, useState} from 'react'
import {Context} from "../index";
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'
import {userGetAll as getAllOrders} from "../http/orderAPI";

const User = () => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        user.setUser({})
        user.setIsAuth(false)
        user.setRole({})
        user.setEmail({})
        logout()
        //navigate('/login', {replace: true})
        window.location.reload();
    }

    return (
        <Container>
            <h1>Личный кабинет</h1>
            <p>
                Это личный кабинет постоянного покупателя магазина
            </p>
            <ul>
                <li ><Link to="/user/orders">История заказов</Link></li>
            </ul>
            <Button onClick={handleLogout}>Выйти</Button>
        </Container>
    )
}

export default User