import {AnyAction, combineReducers} from "redux";
import {tasksReducer} from "./Reducers/tasks-reducer";
import {boardsReducer} from "./Reducers/boards-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./Reducers/app-reducer";
import {authReducer} from "./Reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppDispatch = () =>useDispatch<ThunkAppDispatchType>()
export const useAppSelector:TypedUseSelectorHook<AppRootStateType> = useSelector

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolistInfo: boardsReducer,
    app:appReducer,
    auth:authReducer,
})


export const store = configureStore({
    reducer:rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})