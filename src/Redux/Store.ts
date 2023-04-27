import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";

type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () =>useDispatch<ThunkAppDispatchType>()
export const useAppSelector:TypedUseSelectorHook<AppRootStateType> = useSelector

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolistInfo: todolistsReducer,
    app:appReducer,
    auth:authReducer,

})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>