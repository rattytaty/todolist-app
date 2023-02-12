import {FilterValuesType} from "../App";
import {v1} from "uuid";
import {TodolistMainType} from "../api/todolists-api";

export type DeleteTodoAction = {
    type:"DELETE-TODO"
    todolistId: string
}
export type AddTodoAction = {
    type:"ADD-TODO"
    newTodoTitle: string
    newTodoId:string
}
export type ChangeTodoFilterAction = {
    type:"CHANGE-TODO-FILTER"
    filterValue: FilterValuesType
    todolistId: string
}
export type ChangeTodoNameAction = {
    type:"CHANGE-TODO-TITLE"
    todolistId: string
    newTodoTitle:string
}
export type Actions = DeleteTodoAction|AddTodoAction|ChangeTodoFilterAction|ChangeTodoNameAction

export const DeleteTodoAC =(todolistId: string):DeleteTodoAction =>({type:"DELETE-TODO", todolistId})
export const AddTodoAC =(newTodoTitle: string):AddTodoAction =>({type:"ADD-TODO", newTodoTitle:newTodoTitle, newTodoId:v1()})
export const ChangeTodoFilterAC =(filterValue: FilterValuesType,
todolistId: string):ChangeTodoFilterAction =>({type:"CHANGE-TODO-FILTER", filterValue:filterValue, todolistId:todolistId})
export const ChangeTodoTitleAC =(todolistId: string, newTodoTitle:string):ChangeTodoNameAction =>({type:"CHANGE-TODO-TITLE", newTodoTitle:newTodoTitle, todolistId:todolistId})

const initialState:Array<TodolistMainType> = []

export const todolistsReducer = (todolistInfo:Array<TodolistMainType> = initialState, action:Actions):Array<TodolistMainType> => {
    switch (action.type) {
        case "DELETE-TODO":
            return todolistInfo.filter((todolist) => todolist.id !== action.todolistId)
        case "ADD-TODO":
            const newTodo: TodolistMainType = {id: action.newTodoId, title: action.newTodoTitle, filter: "All", addedDate:"", order:0}
            return[...todolistInfo, newTodo]
        case "CHANGE-TODO-FILTER":
            return todolistInfo.map((tl) => tl.id === action.todolistId ? {...tl, filter: action.filterValue} : tl)
        case "CHANGE-TODO-TITLE":
            return todolistInfo.map((tl) => tl.id === action.todolistId ? {...tl, title: action.newTodoTitle} : tl)
        default: return todolistInfo
    }

}
