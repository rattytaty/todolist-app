import {TasksArrays} from "../App";

import {v1} from "uuid";
import {AddTodoAction, DeleteTodoAction} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../api/tasks-api";

export type  deleteTaskAction = ReturnType<typeof deleteTaskAC>
export type addTaskAction = ReturnType<typeof addTaskAC>
export type changeDoneStatusAction = ReturnType<typeof changeDoneStatusAC>
export type changeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>


export type Actions =
    deleteTaskAction
    | addTaskAction
    | changeDoneStatusAction
    | changeTaskTitleAction
    | AddTodoAction
    | DeleteTodoAction

export const deleteTaskAC = (taskId: string, todolistId: string,) => {
    return {type: "DELETE-TASK", taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (newTaskName: string, todolistId: string) => {
    return {type: "ADD-TASK", newTaskName, todolistId} as const
}
export const changeDoneStatusAC = (status:TaskStatuses, taskId: string, todolistId: string) => {
    return {type: "CHANGE-DONE", status, taskId, todolistId} as const
}

export const changeTaskTitleAC = (newTaskTitle: string, taskId: string, todolistId: string) => {
    return {type: "CHANGE-TITLE", newTaskTitle, taskId, todolistId} as const
}

const initialState : TasksArrays = {}

export const tasksReducer = (state: TasksArrays = initialState, action: Actions): TasksArrays => {
    switch (action.type) {
        case "DELETE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(sTask => sTask.id !== action.taskId)}
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.newTaskName,
                description:"Add description.",
                todoListId:action.todolistId,
                order:0,
                status:0,
                priority:1,
                startDate:"",
                deadline:"",
                addedDate:""
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "CHANGE-DONE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(sTask => sTask.id === action.taskId ? {
                    ...sTask, status:action.status
                } : sTask)
            }
        case "CHANGE-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(sTask => sTask.id === action.taskId ? {
                    ...sTask,
                    title: action.newTaskTitle
                } : sTask)
            }
        case "ADD-TODO":
            return {...state, [action.newTodoId]: []}
        case "DELETE-TODO":

            const copyState = {...state}
            delete copyState[action.todolistId]

            return copyState


        default:
            return state
    }

}
