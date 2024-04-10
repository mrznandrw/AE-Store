import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import FilterBar from "../components/FilterBar";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchCategories, fetchProducts} from "../http/productAPI";
import Pages from "../components/Pages";
import {useParams} from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Shop = observer(() => {
    const {product} = useContext(Context)
    const {id} = useParams()
    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
        fetchBrands().then(data => product.setBrands(data))
        //fetchProducts(null, null, 1, 2).then(data => {
        fetchProducts(/*product.selectedCategory.id*/id? id>5? id :product.selectedCategory.id : null, product.selectedBrand.id, null, product.page, 5).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
   // }, [])
    }, [product.page, product.selectedCategory, product.selectedBrand])

   /* useEffect(() => {
        fetchProducts(product.selectedCategory.id, product.selectedBrand.id, product.page, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })

    }, [product.page, product.selectedCategory, product.selectedBrand])*/

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <FilterBar/>
                </Col>
                <Col md={9}>
                    <Row className="d-flex">
                        { id==0 ? product.products.map(product => <ProductCard key={product.id} product={product}/>
                        ) : (product.products.filter(product => product.categoryId == id  )).map(product =>
                        //{product.products.map(product =>
                            <ProductCard key={product.id} product={product}/>
                        )}
                        {(product.categories.filter(category => category.categoryId == id  )).map(category =>
                            (product.products.filter(product => product.categoryId == category.id  )).map(product =>
                        <ProductCard key={product.id} product={product}/>
                    ))}
                    </Row>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;