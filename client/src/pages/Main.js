import React, {useContext, useEffect} from 'react';
import CategoryBar from "../components/CategoryBar";
import {Col, Container, Row} from "react-bootstrap";
import CarouselBlock from "../components/CarouselBlock";
import ProductList from "../components/ProductList";
import FeaturedProducts from "../components/FeaturedProducts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {fetchCategories} from "../http/productAPI";

const Main = observer(() => {
    const {product} = useContext(Context)

    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
    }, [])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <CategoryBar/>
                </Col>
                <Col md={9}>
                    <Row>
                        <CarouselBlock/>
                    </Row>
                    <Row className="mt-3 mb-3 text-center">
                        <h2>Хиты продаж</h2>
                        <FeaturedProducts/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
});

export default Main;