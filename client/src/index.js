import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import ProductStore from "./store/ProductStore";
import CartStore from "./store/CartStore";

export const  Context =createContext(null)
const container = document.getElementById('root')
const root = createRoot(container);
//ReactDOM.render(
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        product: new ProductStore(),
        cart: new CartStore(),
    }}>

        <App />
    </Context.Provider>,
//const container =
    //document.getElementById('root')
);

