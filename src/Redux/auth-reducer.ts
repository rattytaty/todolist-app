import {authApi, loginData} from "../api/auth-api";
import {Dispatch} from "redux";
import {setLoadingStatusAC} from "./app-reducer";

//types
type ActionsTypes = ReturnType<typeof setIsLoggedInAC>
type initialStateType = typeof  initialState

//ACTION CREATORS
export const setIsLoggedInAC = (value:boolean)=>({type:"auth/SET-IS-LOGGED-IN", value} as const)

//THUNKS
export const logInTC = (data:loginData)=>(dispatch:Dispatch)=>{
    dispatch(setLoadingStatusAC("loading"))
    authApi.login(data)
        .then((res)=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoggedInAC(true))
                dispatch(setLoadingStatusAC("succeeded"))
            } else  {
                dispatch(setIsLoggedInAC(false))
                dispatch(setLoadingStatusAC("succeeded"))
            }

        })

}
export const logOutTC = ()=>(dispatch:Dispatch)=>{
    dispatch(setLoadingStatusAC("loading"))
    authApi.logout()
        .then((res)=>{
            if(res.data.resultCode===0){
                dispatch(setIsLoggedInAC(false))
                dispatch(setLoadingStatusAC("succeeded"))
            } else  {
                dispatch(setIsLoggedInAC(true))
                dispatch(setLoadingStatusAC("succeeded"))
            }
        })
}

//reducer
const initialState = {
    isLoggedIn: false
}
export const authReducer = (state:initialStateType = initialState, action:ActionsTypes):initialStateType=>{
switch (action.type) {
    case "auth/SET-IS-LOGGED-IN":
        return {...state, isLoggedIn: action.value}



    default: return {...state}
}}