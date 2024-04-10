import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    CART_ROUTE, CHECKOUT_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    PRODUCT_ROUTE,
    REGISTRATION_ROUTE, SEARCH_ROUTE,
    SHOP_ROUTE, USER_ROUTE
} from "./utils/consts";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ProductPage from "./pages/ProductPage";
import Main from "./pages/Main";
import Search from "./pages/Search";
import Checkout from "./pages/Checkout";
import User from "./pages/User";
import AdminBrands from "./pages/AdminBrands";
import AdminCategories from "./pages/AdminCategories";
import AdminProducts from "./pages/AdminProducts";
import OrdersPage from "./pages/OrdersPage";
import OrderPage from "./pages/OrderPage";

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_ROUTE + '/orders',
        Component: OrdersPage
    },
    {
        path: ADMIN_ROUTE + '/order/:id',
        Component: OrderPage
    },
    {
        path:  ADMIN_ROUTE + '/categories',
        Component: AdminCategories
    },
    {
        path:  ADMIN_ROUTE + '/brands',
        Component: AdminBrands
    },
    {
        path:  ADMIN_ROUTE + '/products',
        Component: AdminProducts
    },
]

export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: User
    },
    {
        path: USER_ROUTE + '/orders',
        Component: OrdersPage
    },
    {
        path: USER_ROUTE + '/order/:id',
        Component: OrderPage
    },
    {
        path: CHECKOUT_ROUTE,
        Component: Checkout
    },
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE + '/:id',
        Component: Shop
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: CART_ROUTE,
        Component: Cart
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: SEARCH_ROUTE + '/:request',
        Component: Search
    },

]