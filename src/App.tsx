import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from './Store/Store';
import {initializeAppTC} from "./Store/Reducers/app-reducer";
import {CircularProgress} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./components/login/Login";
import {TodolistsPage} from "./components/Pages/Todolist/TodolistsPage";
import {ErrorSnackbar} from "./components/ErrorSnackBar";
import {NavBar} from "./components/NavBar";


export function App() {

    const isInitialized = useAppSelector((state)=>state.app.isInitialized)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(initializeAppTC())
    },[dispatch])
    if (!isInitialized) {
        return <CircularProgress/>
    }

    return (<div className="App">
        <NavBar/>
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






