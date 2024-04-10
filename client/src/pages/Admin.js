import React, {useContext, useEffect, useState} from 'react';
import {Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Image, Modal, Row, Table} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateCategory from "../components/modals/CreateCategory";
import CreateProduct from "../components/modals/CreateProduct";
import DeleteBrand from "../components/modals/DeleteBrand";
import {set} from "mobx";
import DeleteCategory from "../components/modals/DeleteCategory";
import DeleteProduct from "../components/modals/DeleteProduct";
import {Context} from "../index";
import ProductCard from "../components/ProductCard";
import {fetchBrands, fetchCategories, fetchProducts} from "../http/productAPI";
import {ADMIN_ROUTE, PRODUCT_ROUTE, SEARCH_ROUTE} from "../utils/consts";
import Pages from "../components/Pages";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";


const Admin = observer(() => {
    const [crBrandVisible, setCrBrandVisible] = useState(false)
    const [delBrandVisible, setDelBrandVisible] = useState(false)
    const [crCategoryVisible, setCrCategoryVisible] = useState(false)
    const [delCategoryVisible, setDelCategoryVisible] = useState(false)
    const [crProductVisible, setCrProductVisible] = useState(false)
    const [delProductVisible, setDelProductVisible] = useState(false)
    const {product} = useContext(Context)

    useEffect(() => {
        fetchProducts(product.selectedCategory.id, product.selectedCategory.id, product.page, 2).then(data => {
            product.setProducts(data.rows)
            product.setTotalCount(data.count)
        })

    }, [product.page, product.selectedCategory, product.selectedCategory])


    return (
        <Container className="d-flex flex-column">



        <h1>Панель управления</h1>
        <p>
            Это панель управления магазином для администратора
        </p>
        <ul>
            <li><Link to="/admin/orders">Заказы в магазине</Link></li>
            <li><Link to="/admin/categories">Категории каталога</Link></li>
            <li><Link to="/admin/brands">Бренды каталога</Link></li>
            <li><Link to="/admin/products">Товары каталога</Link></li>
        </ul>
    </Container>
    );

});



export default Admin;