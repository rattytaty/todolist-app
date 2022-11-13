import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AddTodoAC} from "./Redux/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Redux/Store";


export type FilterValuesType = "All" | "Completed" | "Active"
export type TodolistInfo = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksArrays = {
    [todolistId: string]: Array<TaskType>
}


function App() {


    let todolistInfo = useSelector<AppRootState, Array<TodolistInfo>>(state => state.todolistInfo)
    const dispatch = useDispatch()

    function addTodolist(newTodoTitle: string) {
        dispatch(AddTodoAC(newTodoTitle))
    }


    const todolistsForRendering = todolistInfo.length
        ? todolistInfo.map((todolist) => {

            return (
                <Todolist key={todolist.id}
                          title={todolist.title}
                          todoId={todolist.id}
                          filter={todolist.filter}
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