import {Outlet} from "react-router-dom";
import '../../App.css';
import React from "react";
import {NavBar} from "../NavBar";
import {ErrorSnackbar} from "../ErrorSnackBar";

export const Layout=()=>{

    return <div className="App">
        <NavBar/>
        <Outlet/>
        <ErrorSnackbar/>
    </div>
}