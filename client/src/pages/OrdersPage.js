import {useState, useEffect, useContext} from 'react'
import {userGetAll, adminGetAll} from '../http/orderAPI.js'
import {Container, Spinner } from 'react-bootstrap'
import Orders from '../components/Orders.js'
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";
import {useLocation} from "react-router-dom";


const OrdersPage = () => {
    const location = useLocation()
    const {user} = useContext(Context)
    const isAdmin = (user.role === 'ADMIN') && (location.pathname === ADMIN_ROUTE + '/orders')
    const [orders, setOrders] = useState(null)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        isAdmin ? adminGetAll()
            .then(
                data => setOrders(data)
            )
            .finally(
                () => setFetching(false)
            )
            : userGetAll()
            .then(
                data => setOrders(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [location.pathname])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>{isAdmin ? 'Все заказы' : 'Ваши заказы' }</h1>
            <Orders items={orders} admin={isAdmin} />
        </Container>
    )
}

export default OrdersPage
