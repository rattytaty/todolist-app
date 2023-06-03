import {TodolistMainType, todolistsApi, TodolistServerType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setLoadingStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type FilterValuesType = "All" | "New" | "Draft" | "Completed" | "In progress"


//Thunk Creators
export const getTodosThunkTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC({loadingStatus: "loading"}))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(SetTodolistsAC({todolists: res.data}))
            dispatch(setLoadingStatusAC({loadingStatus: "succeeded"}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTodoTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC({loadingStatus: "loading"}))
    dispatch(ChangeTodoEntityStatusAC({todolistId, entityStatus: "loading"}))
    todolistsApi.deleteTodolist(todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(DeleteTodoAC({todolistId}))
                dispatch(setLoadingStatusAC({loadingStatus: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })

}
export const CreateTodoTC = (todoTitle: string) => (dispatch: Dispatch) => {
    todolistsApi.createTodolist(todoTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(CreateTodoAC({newTodolist: response.data.data.item}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const ChangeTodoTitleTC = (todoTitle: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsApi.updateTodolistTitle(todolistId, {title: todoTitle})
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(ChangeTodoTitleAC({todolistId, newTodoTitle: todoTitle}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

const initialState: Array<TodolistMainType> = []
const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        DeleteTodoAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        CreateTodoAC(state, action: PayloadAction<{ newTodolist: TodolistServerType }>) {
            state.unshift({...action.payload.newTodolist, filter: "All", entityStatus: "idle"})
        },
        ChangeTodoFilterAC(state, action: PayloadAction<{ filterValue: FilterValuesType, todolistId: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].filter = action.payload.filterValue
        },
        ChangeTodoTitleAC(state, action: PayloadAction<{ todolistId: string, newTodoTitle: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].title = action.payload.newTodoTitle
        },
        SetTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistServerType> }>) {
            return action.payload.todolists.map(todolists => {
                return {...todolists, filter: "All", entityStatus: "idle"}
            })
        },
        ChangeTodoEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.entityStatus
        }
    }
})
export const todolistsReducer = slice.reducer
export const {
    DeleteTodoAC,
    CreateTodoAC,
    ChangeTodoFilterAC,
    ChangeTodoTitleAC,
    SetTodolistsAC,
    ChangeTodoEntityStatusAC
} = slice.actions