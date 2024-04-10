import {Button, Image} from 'react-bootstrap'
import { increment, decrement, remove } from '../http/cartAPI.js'
import React from "react";

const CartItem = (props) => {
    return (
        <tr>
            <td width={130} className="text-center" ><Image width={100} height={102}  src={process.env.REACT_APP_API_URL + props.image}
                        style={{cursor: 'pointer'}}
            />
            </td>
            <td>{props.name}</td>
            <td>
                <Button variant="outline-dark" size="sm" onClick={() => props.decrement(props.id)}>-</Button>
                {' '}<strong>{props.quantity}</strong>{' '}
                <Button variant="outline-dark" size="sm" onClick={() => props.increment(props.id)}>+</Button>
            </td>
            <td>{props.price} ₽</td>
            <td>{props.price * props.quantity} ₽</td>
            <td>
                <Button variant="btn" className="btn-outline-danger" onClick={() => props.remove(props.id)}>
                    Удалить
                </Button>
            </td>
        </tr>
    );
}

export default CartItem