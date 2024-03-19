import {instance} from "./boards-api";

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TasksPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}

export type TaskType = {
    id: string,
    title: string,
    description: string,
    boardId: string,
    order: number,
    status: TaskStatuses,
    priority: TasksPriorities,
    startDate: string,
    deadline: string,
    addedDate: string
}

type GetTasksResponse = {
    items: Array<TaskType>,
    totalCount: number,
    error: any
}

export type ResponseType<D = {}> = {
    data: D,
    messages: [string],
    fieldsErrors: [],
    resultCode: number
}

export type TaskTypeForUpdate = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, Title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {Title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, data: TaskTypeForUpdate) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, data)
    }
}