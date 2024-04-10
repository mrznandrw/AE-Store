import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from 'react-router-dom'
import {fetchOneProduct} from "../http/productAPI";
//import { append } from "../http/cartAPI";
import {Context} from "../index";
//import {addToCart} from "../http/productAPI";
import {observer} from "mobx-react-lite";
import {append} from "../http/cartAPI";

const ProductPage = () => {
    const [product, setProduct] = useState({info: []})
    const {id} = useParams()
    const { cart } = useContext(Context)
    useEffect(() =>{
        fetchOneProduct(id).then(data => setProduct(data))
    }, [id])


    if (!product) {
        return <Spinner animation="border" />
    }

    // функция добавления в корзину
   /* const add = () => {
        const formData = new FormData()
        formData.append('productId', id)
        addToCart(formData).then(response => alert(`Товар ` + product.name + ` был добавлен в вашу корзину!`))
    }*/

    // const add = (productId) => {
    //     addToCart(productId).then(data => {
    //         product.carts = data.products
    //     })
    // }

    const handleClick = (productId) => {
        append(productId).then(data => {
            cart.products = data.products
        })
    }

    return (
        <Container className="mt-3">

            <Row>

                <Col md={4}>
                    <Image width={390} height={394} src={process.env.REACT_APP_API_URL + product.image}/>
                </Col>
                <Col md={5}>
                    <Row className="d-flex flex-column align-items-center">
                        <h1>{product.name}</h1>
                    </Row>
                    <Row className="d-flex flex-column m-3">
                        <h2>Описание</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: "lightgray"}}
                        >
                            {product.description}
                        </div>
                    </Row>
                </Col>
                <Col md={3} className="mt-5 pt-5">
                    <Card
                        className=" d-flex flex-column align-items-center justify-content-around"
                        style={{width: 200, height: 130, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>{product.price} ₽</h3>
                        <Button variant={"outline-dark"} onClick={() => handleClick(product.id)}>В корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h2>Характеристики</h2>
                {product.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>

        </Container>
    );
};

export default ProductPage;