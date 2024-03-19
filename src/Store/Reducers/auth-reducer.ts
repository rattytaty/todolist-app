import {authApi, loginData} from "../../api/auth-api";
import {Dispatch} from "redux";
import {setLoadingStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//THUNKS
export const logInTC = (data: loginData) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC({loadingStatus:"loading"}))
    authApi.login(data)
        .then(res => {
            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({IsLoggedIn:true}))
                dispatch(setLoadingStatusAC({loadingStatus:"succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC({loadingStatus:"loading"}))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({IsLoggedIn:false}))
                dispatch(setLoadingStatusAC({loadingStatus:"succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{IsLoggedIn:boolean}>) {
            state.isLoggedIn=action.payload.IsLoggedIn
        },
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions