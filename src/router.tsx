import React from "react";
import { ErrorPage } from "./components/Pages/ErrorPage";
import {Layout} from "./components/Pages/Layout";
import {createBrowserRouter} from "react-router-dom";
import {TodolistsPage} from "./components/Pages/Todolist/TodolistsPage";
import {Login} from "./components/login/Login";

export const router = createBrowserRouter([{
        path: "/",
        element: <Layout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <TodolistsPage/>
            },
            {
                path: '/login',
                element: <Login/>,
            },
        ]
    }
])
