import React, {useCallback} from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../Store/Store";
import {logOutTC} from "../Store/Reducers/auth-reducer";


export const NavBar: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const appLoadingStatus = useAppSelector((state) => state.app.loadingStatus)
    const logoutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [dispatch])
    return (<div>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton edge="start"
                                color="inherit"
                                aria-label="menu">
                        <Menu/>
                    </IconButton>
                    {isLoggedIn && <Button color="inherit"
                                           onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
            {appLoadingStatus === "loading"
                ? <LinearProgress/>
                : <div style={{height: "4px"}}></div>}
        </div>
    );})

