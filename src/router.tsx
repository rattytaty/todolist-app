import React from "react";
import {ErrorPage} from "./components/Pages/ErrorPage";
import {Layout} from "./components/appLayout/Layout";
import {createBrowserRouter} from "react-router-dom";
import {BoardsPage} from "./components/Pages/Todolist/BoardsPage";
import {Login} from "./components/Pages/login/Login";

export const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    //errorElement: <ErrorPage/>,
    children: [
        {   
            index: true,
            element: <BoardsPage/>
        },
    ]
},
    {
        path: '/login',
        element: <Login/>,
    },
])
