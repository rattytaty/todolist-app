import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../Redux/Store";
import {TodolistMainType} from "../api/todolists-api";
import {createTaskTC, deleteTaskTC, TasksArrays, updateTaskTC} from "../Redux/tasks-reducer";
import {
    ChangeTodoFilterAC,
    ChangeTodoTitleTC,
    CreateTodoTC, deleteTodoTC,
    FilterValuesType,
    getTodosThunkTC
} from "../Redux/todolists-reducer";
import {TaskStatuses} from "../api/tasks-api";
import {AddItemForm} from "./AddItemForm";
import {Todolist} from "./Todolist";
import {Navigate} from "react-router-dom";

export const TodolistsPage: React.FC = () => {
    const todolistInfo = useAppSelector<Array<TodolistMainType>>(state => state.todolistInfo)
    const tasks = useAppSelector<TasksArrays>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    const dispatch = useAppDispatch()
    useEffect(() => {
        if(isLoggedIn) {
            dispatch(getTodosThunkTC())
        }
    }, [dispatch])
    const deleteTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId))
    }, [dispatch]);
    const addTask = useCallback((newTaskName: string, todolistId: string) => {
        dispatch(createTaskTC(todolistId, newTaskName))
    }, [dispatch]);
    const changeDoneStatus = useCallback((status: TaskStatuses, taskId: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}))
    }, [dispatch]);
    const changeTaskTitle = useCallback((title: string, taskId: string, todolistId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}))
    }, [dispatch]);

    const changeTodoFilter = useCallback((filterValue: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodoFilterAC(filterValue, todolistId))
    }, [dispatch]);
    const changeTodoTitle = useCallback((todolistId: string, newTodoTitle: string) => {
        dispatch(ChangeTodoTitleTC(newTodoTitle, todolistId))
    }, [dispatch]);
    const addTodolist = useCallback((newTodoTitle: string) => {
        dispatch(CreateTodoTC(newTodoTitle))
    }, [dispatch])
    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodoTC(todolistId))
    }, [dispatch]);

if (!isLoggedIn) {
    return <Navigate to={"/login"}/>
}

    return <>
        <AddItemForm addItem={addTodolist}/>
        {todolistInfo.map(todolist => {
            return <Todolist
                key={todolist.id}
                title={todolist.title}
                tasks={tasks[todolist.id]}

                todoId={todolist.id}
                filter={todolist.filter}
                entityStatus={todolist.entityStatus}

                deleteTask={deleteTask}
                changeTodoFilter={changeTodoFilter}
                addTask={addTask}
                changeDoneStatus={changeDoneStatus}
                deleteTodolist={deleteTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodoTitle={changeTodoTitle}
            />})}</>}