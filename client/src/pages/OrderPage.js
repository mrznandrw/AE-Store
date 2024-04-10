import {useState, useEffect, useContext} from 'react'
import {userGetOne, adminGetOne} from '../http/orderAPI.js'
import { Container, Spinner } from 'react-bootstrap'
import Order from '../components/Order.js'
import {useLocation, useParams} from 'react-router-dom'
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";

const OrderPage = () => {
    const location = useLocation()
    const {user} = useContext(Context)
    const isAdmin = (user.role === 'ADMIN') && location.pathname.startsWith(ADMIN_ROUTE + '/order')
    const { id } = useParams()
    const [order, setOrder] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        isAdmin ? adminGetOne(id)
            .then(
                data => setOrder(data)
            )
            .catch(
                error => setError(error.response.data.message)
            )
            .finally(
                () => setFetching(false)
            )
            : userGetOne(id)
            .then(
            data => setOrder(data)
            )
            .catch(
                error => setError(error.response.data.message)
            )
            .finally(
                () => setFetching(false)
            )
    }, [id])

    if (fetching) {
        return <Spinner animation="border" />
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <Container>
            <h1>Заказ № {order.id}</h1>
            <Order data={order}/>
        </Container>
    )
}

export default OrderPage