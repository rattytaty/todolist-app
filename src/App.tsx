import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

import {AddItemForm} from "./AddItemForm";

import {useDispatch, useSelector} from "react-redux";

import {AddTodoAC, ChangeTodoFilterAC, ChangeTodoTitleAC, DeleteTodoAC} from "./Redux/todolists-reducer";
import {AppRootState} from "./Redux/Store";
import {addTaskAC, changeDoneStatusAC, changeTaskTitleAC, deleteTaskAC} from "./Redux/tasks-reducer";
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {TodolistMainType} from "./api/todolists-api";

export type FilterValuesType = "All" | "Completed" | "Active"

export type TasksArrays = {
    [todolistId: string]: Array<TaskType>
}


function App() {

    let todolistInfo = useSelector<AppRootState, Array<TodolistMainType>>(state => state.todolistInfo)

    let tasks = useSelector<AppRootState, TasksArrays>(state => state.tasks)

    const dispatch = useDispatch()



    const deleteTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(deleteTaskAC(taskId, todolistId))
    },[dispatch]);

    const addTask = useCallback((newTaskName: string, todolistId: string) => {
        dispatch(addTaskAC(newTaskName, todolistId))
    },[dispatch]);
    const changeDoneStatus = useCallback((status:TaskStatuses, taskId: string, todolistId: string) => {
        dispatch(changeDoneStatusAC(status, taskId,todolistId))
    },[dispatch]);
    const changeTaskTitle = useCallback((newTaskTitle: string, taskId: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(newTaskTitle, taskId, todolistId))
    },[dispatch]);



    const changeTodoFilter = useCallback((filterValue: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodoFilterAC(filterValue, todolistId))
    },[dispatch]);
    const changeTodoTitle = useCallback((todolistId: string, newTodoTitle:string) => {
        dispatch(ChangeTodoTitleAC(todolistId,newTodoTitle))
    },[dispatch]);

    const addTodolist = useCallback((newTodoTitle: string) => {
        dispatch(AddTodoAC(newTodoTitle))
    },[dispatch])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch( DeleteTodoAC(todolistId))
    },[dispatch]);





    const todolistsForRendering = todolistInfo.length
        ? todolistInfo.map((todolist) => {

            return (
                <Todolist key={todolist.id}
                          title={todolist.title}
                          tasks={tasks[todolist.id]}

                          todoId={todolist.id}
                          filter={todolist.filter}



                          deleteTask={deleteTask}
                          changeTodoFilter={changeTodoFilter}
                          addTask={addTask}
                          changeDoneStatus={changeDoneStatus}
                          deleteTodolist={deleteTodolist}
                          changeTaskTitle={changeTaskTitle}
                          changeTodoTitle={changeTodoTitle}
                />

            )
        })
        : <b>No todolists :`(</b>


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolistsForRendering}
        </div>
    );
}

export default App;