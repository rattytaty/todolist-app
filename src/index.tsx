import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";

import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import {store} from "./Store/Store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <BrowserRouter>

            <App/>
        </BrowserRouter>
    </Provider>
);


reportWebVitals();
