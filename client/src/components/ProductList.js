import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import ProductCard from "./ProductCard";

const ProductList = observer(() => {
    const {product} = useContext(Context)
    return (
        <Row className="d-flex">
            {product.products.map(product =>
                <ProductCard key={product.id} product={product}/>
            )}
        </Row>
    );
});

export default ProductList;