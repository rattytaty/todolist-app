import {Dispatch} from "redux";
import {authApi} from "../../api/auth-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({IsLoggedIn:true}))
        } else {
            dispatch(setIsLoggedInAC({IsLoggedIn:false}))
            handleServerAppError(res.data, dispatch)
        }
        dispatch(setAppInitializedAC({isInitialized: true}))
    })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

const slice = createSlice({
    name: "app",
    initialState: {
        loadingStatus: "idle" as RequestStatusType,
        error: null as null | string,
        isInitialized: false
    },
    reducers: {
        setLoadingStatusAC(state, action: PayloadAction<{ loadingStatus: RequestStatusType }>) {
            state.loadingStatus = action.payload.loadingStatus
        },
        setErrorAC(state, action: PayloadAction<{ error: null | string }>) {
            state.error = action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setLoadingStatusAC, setErrorAC, setAppInitializedAC} = slice.actions