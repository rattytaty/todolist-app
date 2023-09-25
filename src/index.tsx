import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import {RouterProvider} from "react-router-dom";
import {store} from "./Store/Store";
import {CircularProgress} from "@mui/material";
import {router} from "./router";



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <RouterProvider router={router}
                        fallbackElement={<CircularProgress/>}/>
    </Provider>
);