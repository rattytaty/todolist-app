import {Outlet} from "react-router-dom";
import React from "react";
import {NavBar} from "../NavBar";
import {ErrorSnackbar} from "../ErrorSnackBar";

export const Layout=()=>{

    return <div>
        <NavBar/>
        <Outlet/>
        <ErrorSnackbar/>
    </div>
}