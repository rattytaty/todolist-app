import axios from "axios";

import {ResponseType} from "./tasks-api";
import {BoardFilterValues} from "../Store/Reducers/boards-reducer";
import {RequestStatusType} from "../Store/Reducers/app-reducer";


export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "204f24ab-6003-4e56-9620-187883ca16f7"
    },
    baseURL:"https://social-network.samuraijs.com/api/1.1/"
})


export type BoardMainType = BoardServerType &{filter:BoardFilterValues, entityStatus:RequestStatusType}

export type BoardServerType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export const boardsApi = {
    getAllBoards() {
        return instance.get<BoardServerType[]>("todo-lists")
    },
    createBoard(title:string) {
        return instance.post<ResponseType<{ item: BoardServerType }>>("todo-lists", {title})
    },
    deleteBoard(todolistId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateBoardTitle(todolistId:string, data:{title:string}) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, data)
    },
}