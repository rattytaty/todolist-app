import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./Redux/Store";
import {addTaskAC, changeDoneStatusAC, changeTaskTitleAC, deleteTaskAC} from "./Redux/tasks-reducer";
import {ChangeTodoFilterAC, ChangeTodoTitleAC, DeleteTodoAC} from "./Redux/todolists-reducer";


type TodolistProps = {
    title: string
    filter: FilterValuesType
    todoId: string
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}




export function Todolist(props: TodolistProps) {

    let tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[props.todoId])
    const dispatch = useDispatch()







    const addNewTask = (itemTitle:string) => {
        dispatch(addTaskAC(itemTitle, props.todoId))
    }
    const filterChange = (filter: FilterValuesType) => () => {
        dispatch(ChangeTodoFilterAC(filter, props.todoId))
    }
    const deleteTodo = () => {
        dispatch( DeleteTodoAC(props.todoId))
    }

    const changeTodoTitle = (editedTitle:string) => {
        dispatch(ChangeTodoTitleAC(props.todoId,editedTitle))
    }


    const taskListItem = (sTask: TaskType) => {
        const removeTask = () => {
            dispatch(deleteTaskAC(sTask.id, props.todoId))
        }

        const changeDoneStatus = (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeDoneStatusAC(event.currentTarget.checked, sTask.id,props.todoId))
        }
        const changeTaskTitle = (editedTitle:string) => {
            dispatch(changeTaskTitleAC(editedTitle, sTask.id, props.todoId))
        }

        return (
            <li
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




    if (props.filter === "Active") {
        tasks = tasks.filter(sTask => !sTask.isDone)
    }
    if (props.filter==="Completed") {
        tasks = tasks.filter(sTask => sTask.isDone)
    }





    const taskList = tasks.length ? tasks.map(taskListItem) : "Todolist is empty :("



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

