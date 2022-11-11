import React, {useState, ChangeEvent,} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type TodolistProps = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string, todolistId: string) => void
    changeTodoFilter: (filterValue: FilterValuesType, todolistId: string) => void
    addTask: (newTaskName: string, todolistId: string) => void
    changeDoneStatus: (isDone: boolean, taskId: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle:(newTaskTitle: string, taskId: string, todolistId: string)=>void
    changeTodoTitle:(todolistId: string, newTodoTitle:string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export function Todolist(props: TodolistProps) {


    const addNewTask = (itemTitle:string) => {
        props.addTask(itemTitle, props.id)
    }

    const filterChange = (filter: FilterValuesType) => () => {
        props.changeTodoFilter(filter, props.id)
    }



    const taskListItem = (sTask: TaskType) => {
        const removeTask = () => props.deleteTask(sTask.id, props.id)
        const changeDoneStatus = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeDoneStatus(event.currentTarget.checked, sTask.id, props.id)
        }
        const changeTaskTitle = (editedTitle:string) => {
            props.changeTaskTitle(editedTitle ,sTask.id, props.id)
        }

        return (<li
            className={sTask.isDone ? "doneTask" : "notDoneTask"}
            key={sTask.id}>
            <input
                onChange={changeDoneStatus}
                type={"checkbox"}
                checked={sTask.isDone}
            />
            <EditableSpan title={sTask.title} editTitle={changeTaskTitle}/>

            <button onClick={removeTask}>x</button>
        </li>)
    }
    const taskList = props.tasks.length ? props.tasks.map(taskListItem) : "Todolist is empty :("
    const deleteTodo = () => {
        props.deleteTodolist(props.id)
    }
    const changeTodoTitle = (editedTitle:string) => {
        props.changeTodoTitle(props.id, editedTitle)
    }


    return (
        <div>
            <h3><EditableSpan editTitle={changeTodoTitle} title={props.title}/>
                <button onClick={deleteTodo}>x</button>
            </h3>

            <AddItemForm addItem={addNewTask}/>


            <ul>
                {taskList}
            </ul>
            <div>
                <button className={props.filter === "All" ? "activeBtn" : "notActiveBtn"}
                        onClick={filterChange("All")}> All
                </button>
                <button className={props.filter === "Active" ? "activeBtn" : "notActiveBtn"}
                        onClick={filterChange("Active")}> Active
                </button>
                <button className={props.filter === "Completed" ? "activeBtn" : "notActiveBtn"}
                        onClick={filterChange("Completed")}> Completed
                </button>
            </div>
        </div>
    )
}

