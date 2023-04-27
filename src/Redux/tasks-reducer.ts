import {CreateTodoAction, DeleteTodoAction} from "./todolists-reducer";
import {tasksApi, TaskType, TaskTypeForUpdate} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./Store";
import {setErrorAC, setErrorACType, setLoadingStatusAC, setStatusACType} from "./app-reducer";

//types
export type TasksArrays = { [todolistId: string]: Array<TaskType> }
export type  deleteTaskAction = ReturnType<typeof deleteTaskAC>
export type addTaskAction = ReturnType<typeof createTaskAC>
export type updateTaskAction = ReturnType<typeof updateTaskAC>
export type setTasksAction = ReturnType<typeof setTasksAC>
export type TaskOptionsForUpdate = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
type ActionsTypes =
    | setStatusACType
    | deleteTaskAction
    | addTaskAction
    | updateTaskAction
    | CreateTodoAction
    | DeleteTodoAction
    | setTasksAction
    | setErrorACType

//action creators
export const deleteTaskAC = (taskId: string, todolistId: string,) => {
    return {type: "DELETE-TASK", taskId: taskId, todolistId: todolistId} as const
}
export const createTaskAC = (todolistId: string, newTask: TaskType) => {
    return {type: "CREATE-TASK", newTask, todolistId} as const
}
export const setTasksAC = (tasks: Array<TaskType>, todoId: string) => {
    return {type: "SET-TASKS", tasks, todoId} as const
}
export const updateTaskAC = (taskOptions: TaskTypeForUpdate, taskId: string, todolistId: string) => {
    return {type: "UPDATE-TASK", taskOptions, taskId, todolistId} as const
}

//thunk creators
export const getTasksTC = (todoId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    tasksApi.getTasks(todoId).then((response) => {
        dispatch(setTasksAC(response.data.items, todoId))
    })
}

export const deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setLoadingStatusAC("loading"))
    tasksApi.deleteTask(todoId, taskId)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(deleteTaskAC(taskId, todoId))
            }
            dispatch(setLoadingStatusAC("succeeded"))
        })
        .catch((e) => {
            console.log(e)
        })
}
export const createTaskTC = (todolistId: string, taskTitle: string) => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(setLoadingStatusAC("loading"))
    tasksApi.createTask(todolistId, taskTitle)
        .then((response) => {
            if (response.data.resultCode===0){
                dispatch(createTaskAC(todolistId, response.data.data.item))
                dispatch(setLoadingStatusAC("succeeded"))
            }else {

            }

        })
        .catch((error) => {

            dispatch(error.message)
            dispatch(setLoadingStatusAC("failed"))
        })
}
export const updateTaskTC = (todoId: string, taskId: string, taskOption: TaskOptionsForUpdate) => (dispatch: Dispatch<ActionsTypes>, getState: () => AppRootStateType) => {

    dispatch(setLoadingStatusAC("loading"))
    const taskForUpdate = getState().tasks[todoId].find((sTask) => sTask.id === taskId)
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

    tasksApi.updateTask(todoId, taskId, model)
        .then(response => {
            if (response.data.resultCode === 0) {

                dispatch(updateTaskAC(response.data.data.item, taskId, todoId))
                dispatch(setLoadingStatusAC("succeeded"))
            } else {

                if (response.data.messages.length) {
                    dispatch(setErrorAC(response.data.messages[0]))
                } else {
                    dispatch(setErrorAC("проделки эдика"))
                }
                dispatch(setLoadingStatusAC("failed"))
            }

        })
        .catch((error) => {
            dispatch(setLoadingStatusAC("failed"))
            dispatch(setErrorAC(error.message))
        })
}



const initialState: TasksArrays = {}

export const tasksReducer = (state: TasksArrays = initialState, action: ActionsTypes): TasksArrays => {
    switch (action.type) {
        case "DELETE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(sTask => sTask.id !== action.taskId)}
        case "CREATE-TASK":

            return {...state, [action.todolistId]: [action.newTask, ...state[action.todolistId]]}
        case "UPDATE-TASK":
            debugger
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(sTask => sTask.id === action.taskId ? {...sTask, ...action.taskOptions} : sTask)
            }
        case "CREATE-TODO":
            return {...state, [action.newTodo.id]: []}
        case "DELETE-TODO":

            const copyState = {...state}
            delete copyState[action.todolistId]

            return copyState
        case "SET-TASKS":
            return {...state, [action.todoId]: action.tasks}

        default:
            return state
    }

}
