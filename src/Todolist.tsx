import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {SingleTask} from "./SingleTask";
import {TaskStatuses, TaskType} from "./api/tasks-api";


type TodolistProps = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    todoId: string

    deleteTask: (id: string, todolistId: string) => void
    changeTodoFilter: (filterValue: FilterValuesType, todolistId: string) => void
    addTask: (newTaskName: string, todolistId: string) => void
    changeDoneStatus: (status:TaskStatuses, taskId: string, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string, todolistId: string) => void
    changeTodoTitle: (todolistId: string, newTodoTitle: string) => void
}


export const Todolist = React.memo((props: TodolistProps) => {


    const addNewTask = useCallback((itemTitle: string) => {
        props.addTask(itemTitle, props.todoId)
    }, [props.addTask, props.todoId])

    const filterChange = (filter: FilterValuesType) => () => {
        props.changeTodoFilter(filter, props.todoId)
    }

    const deleteTask = useCallback((taskId:string) => props.deleteTask(taskId, props.todoId),[props.todoId,  props.deleteTask])
    const changeDoneStatus =  useCallback((status:TaskStatuses, taskId: string) => {
        props.changeDoneStatus(status, taskId, props.todoId)
    },[props.todoId, props.changeDoneStatus])
    const changeTaskTitle =  useCallback((newTaskTitle: string, taskId: string) => {
        props.changeTaskTitle(newTaskTitle, taskId, props.todoId)
    },[props.todoId, props.changeTaskTitle])


    const taskListItem = (sTask: TaskType) => {
        return <SingleTask sTask={sTask} deleteTask={deleteTask} changeDoneStatus={changeDoneStatus} changeTaskTitle={changeTaskTitle} key={sTask.id}/>
    }

    let tasksForTodolist: Array<TaskType> = props.tasks
    if (props.filter === "Active") {
        tasksForTodolist = props.tasks.filter((sTask) => sTask.status === TaskStatuses.New)
    }
    if (props.filter === "Completed") {
        tasksForTodolist = props.tasks.filter((sTask) => sTask.status ===TaskStatuses.Completed )
    }


    const taskList = tasksForTodolist.length ? tasksForTodolist.map(taskListItem) : "Todolist is empty :("
    const deleteTodo = () => {
        props.deleteTodolist(props.todoId)
    }
    const changeTodoTitle = useCallback((editedTitle: string) => {
        props.changeTodoTitle(props.todoId, editedTitle)
    },[props.changeTodoTitle, props.todoId])


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
})

