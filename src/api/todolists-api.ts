import axios from "axios";
import {FilterValuesType} from "../App";

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "9ac1f132-08ab-4d13-9f16-d1bb61f3ef47"
    },
    baseURL:"https://social-network.samuraijs.com/api/1.1/"
})
type ResponseType<D={}> = {
    data:D,
    messages:[],
    fieldsErrors:[],
    resultCode:number
}

export type TodolistMainType = TodolistType &{filter:FilterValuesType}

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title:string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodolist(todolistId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId:string,data:{title:string}) {

        return instance.put<ResponseType>(`todo-lists/${todolistId}`, data)
    },
}