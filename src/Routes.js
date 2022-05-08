import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Login from "./components/login/Login";
import Register from "./components/register/Register"


const webRoutes = () => {
    return (
        <BrowserRouter>
            <Routes >
                <Route element={<Login />} path="/" exact />
                <Route element={<Register />} path="/register" exact />
            </Routes>
        </BrowserRouter>
    )
}

export default webRoutes;