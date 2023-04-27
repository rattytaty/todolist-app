import {TodolistMainType, todolistsApi, TodolistServerType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setLoadingStatusAC, setStatusACType} from "./app-reducer";

export type FilterValuesType = "All" | "Completed" | "Active"
export type DeleteTodoAction = {
    type: "DELETE-TODO"
    todolistId: string
}
export type CreateTodoAction = {
    type: "CREATE-TODO"
    newTodo: TodolistMainType
}
export type ChangeTodoFilterAction = {
    type: "CHANGE-TODO-FILTER"
    filterValue: FilterValuesType
    todolistId: string
}
export type ChangeTodoNameAction = {
    type: "CHANGE-TODO-TITLE"
    todolistId: string
    newTodoTitle: string
}
export type SetTodoAction = {
    type: "SET-TODOS"
    todolists: Array<TodolistServerType>
}
export type changeEntityStatusAction = {
    todoId: string,
    type: "SET-ENTITY-STATUS"
    entityStatus: RequestStatusType
}
export type Actions =
    DeleteTodoAction
    | CreateTodoAction
    | ChangeTodoFilterAction
    | ChangeTodoNameAction
    | SetTodoAction
    | setStatusACType
    | changeEntityStatusAction


//Action Creators
export const DeleteTodoAC = (todolistId: string): DeleteTodoAction => ({type: "DELETE-TODO", todolistId})
export const CreateTodoAC = (newTodo: TodolistMainType): CreateTodoAction => ({type: "CREATE-TODO", newTodo})
export const ChangeTodoFilterAC = (filterValue: FilterValuesType,
                                   todolistId: string): ChangeTodoFilterAction => ({
    type: "CHANGE-TODO-FILTER",
    filterValue: filterValue,
    todolistId: todolistId
})
export const ChangeTodoTitleAC = (todolistId: string, newTodoTitle: string): ChangeTodoNameAction => ({
    type: "CHANGE-TODO-TITLE",
    newTodoTitle: newTodoTitle,
    todolistId: todolistId
})
export const setTodolistsAC = (todolists: Array<TodolistServerType>): SetTodoAction => ({type: "SET-TODOS", todolists})
export const changeTodoEntityStatusAC = (todoId: string, entityStatus: RequestStatusType): changeEntityStatusAction => ({
    type: "SET-ENTITY-STATUS",
    todoId,
    entityStatus
})

//Thunk Creators
export const getTodosThunkTC = () => (dispatch: Dispatch<Actions>) => {
    dispatch(setLoadingStatusAC("loading"))
    todolistsApi.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setLoadingStatusAC("succeeded"))
    })
}
export const deleteTodoTC = (todolistId: string) => (dispatch: Dispatch<Actions>) => {
    dispatch(setLoadingStatusAC("loading"))
    dispatch(changeTodoEntityStatusAC(todolistId, "loading"))
    todolistsApi.deleteTodolist(todolistId)
        .then((response) => {
            dispatch(DeleteTodoAC(todolistId))
            dispatch(setLoadingStatusAC("succeeded"))
        })
        .catch((error)=>{
            dispatch(changeTodoEntityStatusAC(todolistId, "failed"))
            dispatch(setLoadingStatusAC("failed"))
        })
}
export const CreateTodoTC = (todoTitle: string) => (dispatch: Dispatch<Actions>) => {
    todolistsApi.createTodolist(todoTitle).then((response) => {
        dispatch(CreateTodoAC({...response.data.data.item, filter: "All", entityStatus: "idle"}))
    })
}
export const ChangeTodoTitleTC = (todoTitle: string, todoId: string) => (dispatch: Dispatch<Actions>) => {
    todolistsApi.updateTodolistTitle(todoId, {title: todoTitle}).then((response) => {
        dispatch(ChangeTodoTitleAC(todoId, todoTitle))
    })
}

const initialState: Array<TodolistMainType> = []

export const todolistsReducer = (todolistInfo: Array<TodolistMainType> = initialState, action: Actions): Array<TodolistMainType> => {
    switch (action.type) {
        case "DELETE-TODO":
            return todolistInfo.filter((todolist) => todolist.id !== action.todolistId)
        case "CREATE-TODO":

            return [action.newTodo, ...todolistInfo]
        case "CHANGE-TODO-FILTER":
            return todolistInfo.map((tl) => tl.id === action.todolistId ? {...tl, filter: action.filterValue} : tl)
        case "CHANGE-TODO-TITLE":
            return todolistInfo.map((tl) => tl.id === action.todolistId ? {...tl, title: action.newTodoTitle} : tl)
        case "SET-TODOS":
            return action.todolists.map((tl) => {
                return {...tl, filter: "All", entityStatus: "idle"}
            })
        case "SET-ENTITY-STATUS":
            return todolistInfo.map((tl) => tl.id === action.todoId ? {...tl, entityStatus: action.entityStatus} : tl)

        default:
            return todolistInfo
    }
}

