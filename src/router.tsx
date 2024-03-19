import React from "react";
import {Layout} from "./components/appLayout/Layout";
import {createBrowserRouter} from "react-router-dom";
import {BoardsPage} from "./components/Pages/Boards/BoardsPage";
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
        {path:"settings", element:<>settings</>},{path:"calendar", element:<>calendar</>}
    ]
},
    {
        path: '/login',
        element: <Login/>,
    },
])
