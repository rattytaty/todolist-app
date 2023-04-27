import axios from "axios";
import {FilterValuesType} from "../Redux/todolists-reducer";
import {RequestStatusType} from "../Redux/app-reducer";
import {ResponseType} from "./tasks-api";


export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "9ac1f132-08ab-4d13-9f16-d1bb61f3ef47"
    },
    baseURL:"https://social-network.samuraijs.com/api/1.1/"
})


export type TodolistMainType = TodolistServerType &{filter:FilterValuesType, entityStatus:RequestStatusType}

export type TodolistServerType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistServerType[]>("todo-lists")
    },
    createTodolist(title:string) {
        return instance.post<ResponseType<{ item: TodolistServerType }>>("todo-lists", {title})
    },
    deleteTodolist(todolistId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId:string,data:{title:string}) {

        return instance.put<ResponseType>(`todo-lists/${todolistId}`, data)
    },
}