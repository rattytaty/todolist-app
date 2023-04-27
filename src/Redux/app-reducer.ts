import {Dispatch} from "redux";
import {authApi} from "../api/auth-api";
import {setIsLoggedInAC} from "./auth-reducer";

export type RequestStatusType = "idle"|"loading"|"succeeded"|"failed"
type actionTypes = setStatusACType|setErrorACType|setAppInitializedACType
export type setStatusACType = ReturnType<typeof setLoadingStatusAC>
export type setErrorACType = ReturnType<typeof setErrorAC>
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>
type initialStateType = typeof initialState

const initialState ={
    loadingStatus:"idle" as RequestStatusType,
    error: null as null|string,
    isInitialized:false
}

export const setLoadingStatusAC =(loadingStatus:RequestStatusType)=>({type:"APP/SET-STATUS", loadingStatus})as const
export const setErrorAC =(error:null|string)=>({type:"APP/SET-ERROR", error})as const
export const setAppInitializedAC =(isInitialized:boolean)=>({type:"APP/SET-INITIALIZED", isInitialized})as const

export const initializeAppTC = () =>(dispatch:Dispatch)=>{
    authApi.me().then((res)=>{
        if(res.data.resultCode===0){
            dispatch(setIsLoggedInAC(true))
        } else {
            dispatch(setIsLoggedInAC(false))
        }
        dispatch(setAppInitializedAC(true))
    })

}


export const appReducer =(state:initialStateType =initialState, action:actionTypes):initialStateType=>{
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, loadingStatus: action.loadingStatus}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized:action.isInitialized}

        default:
                return state

    }
}
