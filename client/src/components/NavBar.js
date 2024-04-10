import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {
    Button,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
    NavLink
} from "react-bootstrap";
import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SEARCH_ROUTE, USER_ROUTE} from "../utils/consts";
import dropdown from "bootstrap/js/src/dropdown";
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import {useNavigate} from 'react-router-dom'
import CategoryBar from "./CategoryBar";
import FetchCart from "./FetchCart";
import {fetchUser, logout} from "../http/userAPI";
import {fetchOneProduct} from "../http/productAPI";

const NavBar = observer(() => {
    const {user, cart} = useContext(Context)
    const [show, setShow] = useState(false);
    const [request, setRequest] = useState('');
    const [value, setValue] = useState('');
    const location = useLocation()
    const isMain = location.pathname === MAIN_ROUTE
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setRole({})
        user.setEmail({})
        logout()
        window.location.reload();
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container >
                <Navbar.Brand  href={MAIN_ROUTE}>AE store</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {isMain ?
                            <Nav.Link></Nav.Link>
                            :

                            <NavDropdown  style={{height:"fit-content"}} className="me-auto " title="Каталог" id="navbarScrollingDropdown">
                                <CategoryBar/>
                            </NavDropdown>
                        }

                    </Nav>

                    <Form className="d-flex flex-fill justify-content-start">
                        <Form.Control
                            type="search"
                            placeholder="Поиск по сайту"
                            onChange={e => setRequest(e.target.value)}
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button type="submit" onClick={() => navigate(SEARCH_ROUTE +`/${request}`)} variant="outline-success" className="me-2">Поиск</Button>
                    </Form>

                    {user.isAuth ?
                        <NavDropdown align="end" className=" me-2 dropdown-menu-sm-start position:absolute left"
                                  title={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                              fill="currentColor"
                                              className="bi bi-person-circle" viewBox="0 0 16 16">
                                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                                      <path fillRule="event"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                                  </svg>} id="navbarScrollingDropdown " //show={show}
                                 // onMouseEnter={() => setShow(true)}
                                 // onMouseLeave={() => setShow(false)}
                            >
                                <NavDropdown.Item
                                    href="#action3"
                                    onClick={() => navigate(USER_ROUTE)}
                                >
                                    {user.email}
                                </NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item
                                    href="#action4"
                                    onClick={() => navigate(USER_ROUTE + '/orders')}
                                >
                                    Заказы
                                </NavDropdown.Item>
                            {user.role === 'ADMIN'?
                                <NavDropdown.Item
                                    //href={ADMIN_ROUTE}
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                >
                                    Админ-панель
                                </NavDropdown.Item>:<></>}
                                <NavDropdown.Item
                                    //href="#action5"
                                    onClick={() => logOut()}
                                >
                                   Выйти
                                </NavDropdown.Item>

                    </NavDropdown>
                        :
                        <Button type="button"
                                className="me-2 btn btn-primary"
                                onClick={() =>navigate(LOGIN_ROUTE)} >
                            Авторизация
                        </Button>
                    }

                    <Button variant="outline-primary" type="button" className="me-2" href={CART_ROUTE}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-cart3" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                        </svg>
                         Корзина
                        {!!cart.count && <span>({cart.count})</span>}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;