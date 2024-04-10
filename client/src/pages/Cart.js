// import React, { useEffect } from 'react';
// import { useContext, useState } from 'react';
// import { Context } from '../';
// import {addToCart, deleteFromCart, getCart, /*getUserOrder, getUserOrderList*/} from '../http/productAPI';
// import {Button, Card, Col, Container, Row} from 'react-bootstrap'
// import { observer } from 'mobx-react-lite';
// //import CreateOrder from "../components/modals/CreateOrder";
// import Image from "react-bootstrap/Image";
//
// const Cart = observer(() => {
//     const {product} = useContext(Context)
//     const {device,user, a} = useContext(Context)
//     const [orderVisible, setOrderVisible] = useState(false)
//     useEffect(() => {
//         getCart().then(data => product.setCarts(data))
//         //getUserOrder(user.isUser).then(data => device.setOrders(data))
//         //getUserOrderList(device._selectedOrder).then(data => device.setOrdersList(data))
//     }, [product])//,device._selectedOrder, a])
//
//     const refreshPage = ()=>{
//         window.location.reload();
//     }
//     const _delete = (id) => {
//         deleteFromCart(id).then(response => alert(`Товар удален с корзины`)).then(response => refreshPage())
//
//     }
//
//     // ----- Считаем общую сумму, которую юзер набрал в корзину ------- //
//
//     let prices = 0;
//     {product.cart.map(price =>
//         prices += price.product.price
//     )}
//    /* let prices2 = 0;
//     {device._orders_lists.map(price =>
//         prices2 += price.product.price
//     )}*/
//     return (
//         <Container
//             className="d-flex flex-sm-column justify-content-center align-items-center mt-3"
//         >
//             <h1 className="pb-2">Корзина</h1>
//
//             {/* ------- Считаем общую сумму ------- */}
//
//             <Card className="d-flex flex-row  p-2 justify-content-between align-items-center mb-2">
//                 <h1 className="align-self-end" >Всего:</h1>
//                 <h3  className="ms-3 align-self-end">{prices}<span className="font-weight-light pl-2"> $$$ </span></h3>
//             </Card>
//             {product.cart.map(product =>
//                 <Card className="d-flex w-100 p-2 justify-content-center mb-2"  key={product.id}>
//
//                     <Row>
//                         <Col md="2" className="d-inline-flex flex-row">
//                             <div className="flex-row" >
//                                 <img src={process.env.REACT_APP_API_URL + product.product.image} alt="img not found" height={100}  />
//                             </div>
//                         </Col>
//                         <Col  className="d-flex flex-row">
//                             <div className="flex-row">
//                                 <h1 className="ms-3">{product.product.name}</h1>
//                             </div>
//                         </Col>
//                         <Col  className="d-flex flex-row justify-content-end">
//                             <div className="flex-row">
//                                 <h2 className="font-weight-light">{product.product.price} $$$ </h2>
//                             </div>
//                         </Col>
//                         <Col  className="d-flex flex-row justify-content-end">
//                             <div className="flex-row">
//                                 <Button className="bg-danger" onClick={() => _delete(product.id)}> Delete </Button>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Card>
//             )}
//
//
//
//             <h1 className="pt-5 pb-2">Предварительные заказы</h1>
//
//
//
//         </Container>
//     );
//
// });
//
// export default Cart;



import CartList from '../components/CartList.js'
import { Container } from 'react-bootstrap'
import {observer} from "mobx-react-lite";

const Cart = observer(() => {
    return (
        <Container>
            <h1>Корзина</h1>
            <CartList />
        </Container>
    )
})

export default Cart