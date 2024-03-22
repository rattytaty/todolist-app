import React from "react";
import {Layout} from "./components/appLayout/Layout";
import {createBrowserRouter} from "react-router-dom";
import {AllBoardsPage} from "./components/Boards/AllBoardsPage";
import {Login} from "./components/login/Login";
import {BoardPage} from "./components/Boards/BoardPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    //errorElement: <ErrorPage/>,
    children: [
        {
            index: true,
            element: <AllBoardsPage/>
        },
        {path: "board/:boardId",
            element: <BoardPage/>},
        {
            path: "settings",
            element: <>settings</>
        },
        {
            path: "calendar",
            element: <>calendar</>
        }
    ]
},
    {
        path: '/login',
        element: <Login/>,
    },
])
