import React, {useState, KeyboardEvent, ChangeEvent, MouseEventHandler} from "react";
import {FilterValuesType} from "./App";


type TodolistProps = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string, todolistId: string) => void
    changeFilter: (filterValue: FilterValuesType, todolistId: string) => void
    addTask: (newTaskName: string, todolistId: string) => void
    changeDoneStatus:(isDone: boolean, taskId: string, todolistId: string) => void
    filter: FilterValuesType
    id: string
    deleteTodolist:(todolistId: string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}



export function Todolist(props: TodolistProps) {

    const [newTaskName, setNewTaskName] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const addNewTask = () => {
        const noSpaceTaskName = newTaskName.trim()
        if (noSpaceTaskName !== "") {
            props.addTask(noSpaceTaskName, props.id)
        } else {!error && setError(true)
            console.log(error)
        }
        setNewTaskName("")
    }
    const filterChange = (filter: FilterValuesType) => () => {props.changeFilter(filter, props.id)}
    const inputEnterPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addNewTask()
    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {setNewTaskName(event.currentTarget.value)
    setError(false)}
    const errorMessage = error ? <div className={"errorMessage"}> Title is required </div> : null
    const taskListItem = (sTask: TaskType) => {
        const removeTask = () => props.deleteTask(sTask.id, props.id)
        const changeDoneStatus =(event:ChangeEvent<HTMLInputElement>) => {
            props.changeDoneStatus(event.currentTarget.checked, sTask.id, props.id)
        }

        return (<li
            className={sTask.isDone ? "doneTask" : "notDoneTask" }
            key={sTask.id}>
            <input

            onChange={changeDoneStatus}
            type={"checkbox"}
            checked={sTask.isDone}

            />

            <span>{sTask.title}</span>
            <button onClick={removeTask}>x</button>
        </li>)
    }
    const taskList = props.tasks.length ? props.tasks.map(taskListItem) : "Todolist is empty :("
    const deleteTodolist = () => {props.deleteTodolist(props.id)}



    return (
        <div>
            <h3>{props.title} <button onClick={deleteTodolist}>x</button></h3>

            <div>
                <input
                    className={ error ?"inputError" : ""}
                    value={newTaskName}
                    onChange={inputOnChange}
                    onKeyDown={inputEnterPress}/>


                <button onClick={addNewTask}>+</button>
            </div>
            {errorMessage}



            <ul>
                {taskList}
            </ul>
            <div>
                <button className={props.filter === "All" ?"activeBtn":"notActiveBtn"} onClick={filterChange("All")}> All</button>
                <button className={props.filter === "Active" ?"activeBtn":"notActiveBtn"} onClick={filterChange("Active")}> Active</button>
                <button className={props.filter === "Completed" ?"activeBtn":"notActiveBtn"} onClick={filterChange("Completed")}> Completed</button>
            </div>
        </div>
    )
}

