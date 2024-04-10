//import { fetchCart } from '../http/cartAPI.js'
import { useContext, useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import {Context} from "../index";
import {fetchCart} from "../http/cartAPI";

const FetchCart = (props) => {
    const { cart } = useContext(Context)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        fetchCart()
            .then(
                data => cart.products = data.products
            )
            .finally(
                () => setFetching(false)
            )
    }, [])

    if (fetching) {
        return <Spinner animation="border" variant="light" />
    }
    return props.children
}

export default FetchCart