import axios from "axios";

import {ResponseType} from "./tasks-api";
import {FilterValuesType} from "../Store/Reducers/todolists-reducer";
import {RequestStatusType} from "../Store/Reducers/app-reducer";


export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "204f24ab-6003-4e56-9620-187883ca16f7"
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