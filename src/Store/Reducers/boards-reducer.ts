import {BoardMainType, boardsApi, BoardServerType} from "../../api/boards-api";
import {Dispatch} from "redux";
import {RequestStatusType, setLoadingStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type BoardFilterValues = "All" | "New" | "Draft" | "Completed" | "In progress"


//Thunk Creators
export const getAllBoardsTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC({loadingStatus: "loading"}))
    boardsApi.getAllBoards()
        .then(res => {
            dispatch(SetAllBoardsAC({todolists: res.data}))
            dispatch(setLoadingStatusAC({loadingStatus: "succeeded"}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteBoardTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC({loadingStatus: "loading"}))
    dispatch(ChangeBoardEntityStatusAC({todolistId, entityStatus: "loading"}))
    boardsApi.deleteBoard(todolistId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(DeleteBoardAC({todolistId}))
                dispatch(setLoadingStatusAC({loadingStatus: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })

}
export const createBoardTC = (boardTitle: string) => (dispatch: Dispatch) => {
    boardsApi.createBoard(boardTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(CreateBoardAC({newTodolist: response.data.data.item}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeBoardTitleTC = (boardTitle: string, todolistId: string) => (dispatch: Dispatch) => {
    boardsApi.updateBoardTitle(todolistId, {title: boardTitle})
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(ChangeBoardTitleAC({todolistId, newTodoTitle: boardTitle}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

const initialState: Array<BoardMainType> = []
const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        DeleteBoardAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        CreateBoardAC(state, action: PayloadAction<{ newTodolist: BoardServerType }>) {
            state.unshift({...action.payload.newTodolist, filter: "All", entityStatus: "idle"})
        },
        ChangeBoardFilterAC(state, action: PayloadAction<{ filterValue: BoardFilterValues, todolistId: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].filter = action.payload.filterValue
        },
        ChangeBoardTitleAC(state, action: PayloadAction<{ todolistId: string, newTodoTitle: string }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].title = action.payload.newTodoTitle
        },
        SetAllBoardsAC(state, action: PayloadAction<{ todolists: Array<BoardServerType> }>) {
            return action.payload.todolists.map(todolists => {
                return {...todolists, filter: "All", entityStatus: "idle"}
            })
        },
        ChangeBoardEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.entityStatus
        }
    }
})
export const boardsReducer = slice.reducer
export const {
    DeleteBoardAC,
    CreateBoardAC,
    ChangeBoardFilterAC,
    ChangeBoardTitleAC,
    SetAllBoardsAC,
    ChangeBoardEntityStatusAC
} = slice.actions