import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {ErrorSnackbar} from "../ErrorSnackBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {CircularProgress, CssBaseline} from "@mui/material";
import {useAppSelector} from "../../Store/Store";
import {Header} from "./Header";
import {SideBar} from "./SideBar";


export const Layout = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const appLoadingStatus = useAppSelector((state) => state.app.loadingStatus)


    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);



    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };



    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }
    return <Box sx={{
        height: "100vh",
        width: "100vw",
        display: 'flex'
    }}>
        <CssBaseline/>
        <Header handleDrawerToggle={handleDrawerToggle}/>
        <SideBar setIsClosing={setIsClosing}
                 setMobileOpen={setMobileOpen}
        mobileOpen={mobileOpen}

        />
        <Box component="main"
             sx={{
                 height: "100%",
                 width: "100%",
                 p: 3,
                 background: "#252735",
                 overflow: "auto"
             }}>
            <Toolbar/>
            <Outlet/>

            {appLoadingStatus === "loading"
                ? <CircularProgress/>
                : null}

            <ErrorSnackbar/>
        </Box>
    </Box>
}