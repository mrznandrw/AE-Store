import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, fetchUser, getRole} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import {fetchCart} from "./http/cartAPI";
import axios from "axios";



const App = observer(() => {
    const {user, cart} = useContext(Context)
    const [loading, setLoading] = useState(true)

    /*useEffect(() => {
            check().then(data => {
                user.setUser(data.id)//true)
                user.setIsAuth(true)
                user.setRole(data.role)
            }).finally(() => setLoading(false))
    }, [])*/

    useEffect(() => {
        Promise.all([check(), fetchCart()])
            .then(
                axios.spread(async (userData, cartData) => {
                    if (userData) {
                        user.setUser(userData.id)//true)
                        user.setIsAuth(true)
                        user.setRole(await getRole(userData.roleId))
                        user.setEmail(userData.email)
                    }
                    cart.products = cartData.products
                })
            )
            .finally(
                () => setLoading(false)
            )
    }, [])



    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
    <BrowserRouter>
        <NavBar />
        <AppRouter />
    </BrowserRouter>
  );
});

export default App;
