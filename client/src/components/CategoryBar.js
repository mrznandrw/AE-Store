// import React, {useContext, useState} from 'react';
// import {ButtonGroup, Col, Container, Dropdown, DropdownButton, ListGroup, Row, SplitButton} from "react-bootstrap";
// import {Context} from "../index";
// import {LOGIN_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE} from "../utils/consts";
// import {useNavigate} from "react-router-dom";
// import {forEach} from "react-bootstrap/ElementChildren";
// import {observer} from "mobx-react-lite";
// import ProductCard from "./ProductCard";
//
// const CategoryBar = observer(() => {
//     const navigate = useNavigate()
//     const [show, setShow] = useState('none');
//     const {product} = useContext(Context)
//
//     return (
//         <Container>
//                 {(product.categories.filter(category => category.categoryId ===null)).map(category =>
//                 <SplitButton
//                     href={SHOP_ROUTE +'/'+category.id}
//                     drop="end"
//                     variant="outline-dark"
//                     className="justify-content-center  d-flex"
//                     id={category.id}
//                     key={category.id}
//                     title= {category.name} //show ={show} onMouseEnter={() => setShow(true)}
//                     // onMouseLeave={() => setShow(false)}>
//                 >
//                     {(product.categories.filter(category => category.categoryId > 0)).map(category =>
//                         <Dropdown.Item href={SHOP_ROUTE +'/'+category.id}>{category.name}</Dropdown.Item>)}
//                 </SplitButton>)}
//
//         </Container>
//     );
// });
//
// export default CategoryBar;

import React, { useContext, useState } from 'react';
import { ButtonGroup, Col, Container, Dropdown, DropdownButton, ListGroup, Row, SplitButton } from "react-bootstrap";
import { Context } from "../index";
import { LOGIN_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { forEach } from "react-bootstrap/ElementChildren";
import { observer } from "mobx-react-lite";
import ProductCard from "./ProductCard";

const CategoryBar = observer(() => {
    const navigate = useNavigate()
    const { product } = useContext(Context)

    // Используем объект для хранения состояний показа подкатегорий для каждой категории
    const [show, setShow] = useState('none');

    const handleToggleSubcategories = (categoryId) => {
        setShow(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId] // Инвертируем состояние для данной категории
        }));
    };

    return (
        <Container>
            {(product.categories.filter(category => category.categoryId === null)).map(category =>
                <SplitButton
                    href={SHOP_ROUTE + '/' + category.id}
                    drop="end"
                    variant="outline-dark"
                    className="justify-content-center  d-flex"
                    id={category.id}
                    key={category.id}
                    title={category.name}
                    onClick={() => handleToggleSubcategories(category.id)} // Вызываем функцию для показа/скрытия подкатегорий
                    style={{ width: '200px' }}
                >
                    {(product.categories.filter(subcategory => subcategory.categoryId === category.id)).map(subcategory =>
                        <Dropdown.Item key={subcategory.id} href={SHOP_ROUTE + '/' + subcategory.id}>{subcategory.name}</Dropdown.Item>)}
                </SplitButton>)}

        </Container>
    );
});

export default CategoryBar;
