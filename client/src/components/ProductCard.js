import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {PRODUCT_ROUTE} from "../utils/consts";
import {append} from "../http/cartAPI";
import {Context} from "../index";

const ProductCard = ({product}) => {
    const navigate = useNavigate()
    const { cart } = useContext(Context)

    const handleClick = (productId) => {
        append(productId).then(data => {
            cart.products = data.products
        })
    }

    return (
        <Col md={10}>
            <Card className="mt-2" style={{ height: 200, fontSize: 16, }}>
                <Row>

                    <Col md={3} className="mt-3 text-center">
                        <Image width={160} height={162} src={process.env.REACT_APP_API_URL + product.image}
                               onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
                               style={{cursor: 'pointer'}}
                        />
                    </Col>
                    <Col className="mt-5"  md={6}>

                        <Row className="d-flex flex-column  ">

                            <div
                                onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
                                className="d-flex align-items-center justify-content-center"
                                style={{cursor: 'pointer'}}

                            >
                                {product.title}
                            </div>
                        </Row>
                    </Col>
                    <Col md={3} className="mt-5 justify-content-center text-center">
                        <h3>{product.price} ₽</h3>
                        <Button   variant={"outline-dark"} onClick={() => handleClick(product.id)}>В корзину</Button>

                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default ProductCard;