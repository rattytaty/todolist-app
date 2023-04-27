import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./Redux/Store";
import {CircularProgress, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "./cumPonents/ErrorSnackBar";
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "./cumPonents/login/Login";
import {TodolistsPage} from "./cumPonents/TodolistsPage";
import {initializeAppTC} from "./Redux/app-reducer";
import {logOutTC} from "./Redux/auth-reducer";


export function App() {
    const appLoadingStatus = useAppSelector((state) => state.app.loadingStatus)
    const isInitialized = useAppSelector((state)=>state.app.isInitialized)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(initializeAppTC())

    },[])

    const logOutHandler = ()=>{
dispatch(logOutTC())
    }

    if (!isInitialized) {
        return <CircularProgress/>
    }

    return (<div className="App">
        {isLoggedIn && <button onClick={logOutHandler}>LogOut</button>}
        {appLoadingStatus === "loading" && <LinearProgress/>}
        <Routes>
            <Route path={'/404'} element={<h1>404: Page not found</h1>}/>
            <Route path={"*"} element={<Navigate to={'/404'}/>}/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/todolist-app"} element={<Navigate to={"/"}/>}/>
            <Route path={"/"} element={<TodolistsPage/>}/>
        </Routes>



        <ErrorSnackbar/>

    </div>);
}






