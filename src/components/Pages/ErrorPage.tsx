import {NavLink} from "react-router-dom";
import React from "react";

export const ErrorPage = () => {

    return <div>
        <div>Page not found!</div>
        <NavLink to={"/"}>Go back to Home Page.</NavLink>
    </div>
}