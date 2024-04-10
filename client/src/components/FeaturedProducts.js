import React, {useContext, useEffect} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {PRODUCT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {fetchBrands, fetchCategories, fetchProducts} from "../http/productAPI";
import {observer} from "mobx-react-lite";
import {append} from "../http/cartAPI";

const FeaturedProducts = observer(() => {
    const navigate = useNavigate()
    const {product, cart} = useContext(Context)

    const handleClick = (productId) => {
        append(productId).then(data => {
            cart.products = data.products
        })
    }

    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
        fetchBrands().then(data => product.setBrands(data))
        fetchProducts().then(data => {
        //fetchProducts(product.selectedCategory.id, product.selectedBrand.id, product.page, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })
         }, [])
    //}, [product.page, product.selectedCategory, product.selectedBrand])

    return (
        <Row>
            {(product.products.filter(product => product.id < 4)).map(product =>
                <Col className="mt-3  ms-5 text-center" md={3}>
                    <Card className="d-flex align-items-center" style={{width:250, height:"fit-content", cursor: 'pointer'}} border={"dark"}>
                        <Image className="mt-2" onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)} width={150} height={150}
                               src={process.env.REACT_APP_API_URL + product.image}/>
                        <div className="mt-1d-flex justify-content-between align-items-center"
                             onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)}
                        >
                            {product.name}
                        </div>
                        <div className="fw-bold" style={{fontSize: 18,}}>{product.price}  ₽</div>
                        <div>
                            <Button className="mb-3" variant={"outline-dark"} onClick={() => handleClick(product.id)}>В корзину</Button>
                        </div>
                    </Card>
                </Col>
            )}
        </Row>
      );
});

export default FeaturedProducts;