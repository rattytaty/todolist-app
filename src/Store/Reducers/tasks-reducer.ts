import {CreateTodoAC, DeleteTodoAC, SetTodolistsAC} from "./todolists-reducer";
import {tasksApi, TaskType, TaskTypeForUpdate} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../Store";
import {setLoadingStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//types
export type TasksArrays = { [todolistId: string]: Array<TaskType> }
export type TaskOptionsForUpdate = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


//thunk creators
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch
) => {
    tasksApi.getTasks(todolistId)
        .then(response => {

            dispatch(setTasksAC({tasks:response.data.items, todolistId}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC({loadingStatus: "loading"}))
    tasksApi.deleteTask(todolistId, taskId)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(deleteTaskAC({taskId, todolistId}))
                dispatch(setLoadingStatusAC({loadingStatus: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const createTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC({loadingStatus: "loading"}))
    tasksApi.createTask(todolistId, taskTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(createTaskAC({todolistId, newTask:response.data.data.item}))
                dispatch(setLoadingStatusAC({loadingStatus: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todolistId: string, taskId: string, taskOption: TaskOptionsForUpdate) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    dispatch(setLoadingStatusAC({loadingStatus: "loading"}))
    const taskForUpdate = getState().tasks[todolistId].find(Task => Task.id === taskId)
    if (!taskForUpdate) {
        console.warn("task not found")
        return
    }
    const model: TaskTypeForUpdate = {
        title: taskForUpdate.title,
        status: taskForUpdate.status,
        deadline: taskForUpdate.deadline,
        description: taskForUpdate.description,
        priority: taskForUpdate.priority,
        startDate: taskForUpdate.startDate,
        ...taskOption
    }

    tasksApi.updateTask(todolistId, taskId, model)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(updateTaskAC({taskOptions:response.data.data.item, taskId, todolistId}))
                dispatch(setLoadingStatusAC({loadingStatus: "succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}


const initialState: TasksArrays = {}
const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        deleteTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        createTaskAC(state, action: PayloadAction<{ todolistId: string, newTask: TaskType }>) {
            state[action.payload.todolistId].unshift(action.payload.newTask)
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        updateTaskAC(state, action: PayloadAction<{ taskOptions: TaskTypeForUpdate, taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.taskOptions}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(SetTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(todolist => state[todolist.id] = [])
        })
        builder.addCase(DeleteTodoAC, (state, action) => {
            delete state[action.payload.todolistId]
        })
        builder.addCase(CreateTodoAC, (state, action) => {
            state[action.payload.newTodolist.id] = []
        })
    }
})
export const tasksReducer = slice.reducer
export const {deleteTaskAC, createTaskAC, setTasksAC, updateTaskAC} = slice.actions