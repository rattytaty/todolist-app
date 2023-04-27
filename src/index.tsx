import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {store} from "./Redux/Store";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";


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
