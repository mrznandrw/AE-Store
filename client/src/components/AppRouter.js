import React, {useContext} from 'react';
//import {Routes, Route, Redirect, Navigate} from "react-router-dom";
import {  Navigate, Route, Routes } from 'react-router-dom';
//import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
// import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import NotFoundPage from './NotFoundPage';


const AppRouter = () => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Routes>
            {(user.role === 'ADMIN') && user.isAuth && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<NotFoundPage />} />
            {/*<Route path="*" element={<Navigate to ={MAIN_ROUTE} />} />*/}
        </Routes>
    );
};

export default AppRouter;