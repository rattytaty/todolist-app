import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    tasks:tasksReducer,
    todolistInfo: todolistsReducer
})

export const store = legacy_createStore(rootReducer)

export type AppRootState = ReturnType<typeof rootReducer>