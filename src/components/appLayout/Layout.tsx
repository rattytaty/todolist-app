import {Navigate, Outlet} from "react-router-dom";
import React, {useState} from "react";
import {ErrorMessage} from "./ErrorMessage";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {CssBaseline} from "@mui/material";
import {useAppSelector} from "../../Store/Store";
import {Header} from "./Header";
import {SideBar} from "./SideBar";
import {LoadingCircle} from "./LoadingCircle";

export const Layout = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDrawerClosing, setIsDrawerClosing] = useState(false);

    const handleDrawerToggle = () => {
        if (!isDrawerClosing) {
            setIsDrawerOpen(!isDrawerOpen);
        }
    };

    if (!isLoggedIn) {
        return <Navigate to="/login"/>
    }
    return <Box sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        position: "relative"
    }}>
        <CssBaseline/>
        <Header handleDrawerToggle={handleDrawerToggle}/>
        <SideBar setDrawerIsClosing={setIsDrawerClosing}
                 setIsDrawerOpen={setIsDrawerOpen}
                 isDrawerOpen={isDrawerOpen}/>
        <Box component="main"
             sx={{
                 height: "100%",
                 width: "100%",
                 background: "#252735",
                 overflow: "auto",
                 overscrollBehavior: "none"
             }}>
            <Toolbar variant="dense"/>
            <Outlet/>
        </Box>
        <ErrorMessage/>
        <LoadingCircle/>
    </Box>
}