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

const Search = observer(() => {
    const limit = 5
    const {product} = useContext(Context)
    const {request} = useParams()
    /*const filteredProducts = (product.products.filter(product => product.title.includes(request))).map(product =>
        <ProductCard key={product.id} product={product}/>
    )}*/

    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
        fetchBrands().then(data => product.setBrands(data))
        //fetchProducts(null, null, 1, 2).then(data => {
        fetchProducts(product.selectedCategory.id, product.selectedBrand.id, request, product.page, limit).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count-5)
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
                    <h3>Результаты поиска по запросу "{request}"</h3>
                    <Row className="d-flex">
                        {(product.products.filter(product => product.title.toLowerCase().includes(request.toLowerCase()))).map(product =>
                            <ProductCard key={product.id} product={product}/>
                        )}
                    </Row>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Search;