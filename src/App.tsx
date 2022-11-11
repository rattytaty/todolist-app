import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "All" | "Completed" | "Active"
export type TodolistInfo = {
    id: string
    title: string
    filter: FilterValuesType
}
export type todolistTasksArr = {
    [todolistId: string]: Array<TaskType>
}


function App() {

    const TodolistId1 = v1()
    const TodolistId2 = v1()

    let [todolistInfo, setTodolistInfo] = useState<Array<TodolistInfo>>([
        {id: TodolistId1, title: "What to learn", filter: "All"},
        {id: TodolistId2, title: "What to buy", filter: "All"}
    ])

    let [tasks, setTasks] = useState<todolistTasksArr>({
        [TodolistId1]: [
            {id: v1(), title: "Grid", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "mySQL", isDone: false}],
        [TodolistId2]: [
            {id: v1(), title: "Sneakers", isDone: true},
            {id: v1(), title: "Bag", isDone: false},
            {id: v1(), title: "RTX4070", isDone: false}]
    })


    function deleteTask(taskId: string, todolistId: string) {

        const ArrForRemoving = tasks[todolistId]
        const updatedTasks = ArrForRemoving.filter((sTask) => sTask.id !== taskId)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedTasks
        setTasks(copyTasks)

        //setTasks({...tasks, [todolistId]: tasks[todolistId].filter((sTask)=>sTask.id !==taskId)})
    }

    function changeTodoFilter(filterValue: FilterValuesType, todolistId: string) {
        setTodolistInfo(todolistInfo.map((tl) => tl.id === todolistId ? {...tl, filter: filterValue} : tl))
    }

    function changeTodoTitle(todolistId: string, newTodoTitle:string) {
        setTodolistInfo(todolistInfo.map((tl) => tl.id === todolistId ? {...tl, title: newTodoTitle} : tl))
    }

    function addTask(newTaskName: string, todolistId: string) {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskName,
            isDone: false
        }
        const ArrForAdding: Array<TaskType> = tasks[todolistId]
        const updatedTasks: Array<TaskType> = [newTask, ...ArrForAdding]
        setTasks({...tasks, [todolistId]: updatedTasks})
        console.log(tasks)

        //setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function addTodolist(newTodoTitle: string) {
        const newTodoId = v1()
        const newTodo: TodolistInfo = {id: newTodoId, title: newTodoTitle, filter: "All"}
        setTodolistInfo([...todolistInfo, newTodo])
        setTasks({...tasks, [newTodoId]: []})

    }

    function changeDoneStatus(isDone: boolean, taskId: string, todolistId: string) {
        const ArrForChanging = tasks[todolistId]
        const updatedArr: Array<TaskType> = ArrForChanging.map(sTask => sTask.id === taskId ? {
            ...sTask,
            isDone: isDone
        } : sTask)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedArr
        setTasks(copyTasks)

        //setTasks({...tasks, [todolistId]: tasks[todolistId].map(sTask=>sTask.id===taskId ? {...sTask, isDone:isDone} : sTask)})
    }

    function changeTaskTitle(newTaskTitle: string, taskId: string, todolistId: string) {
        const ArrForChanging = tasks[todolistId]
        const updatedArr: Array<TaskType> = ArrForChanging.map(sTask => sTask.id === taskId ? {
            ...sTask,
            title: newTaskTitle
        } : sTask)
        const copyTasks = {...tasks}
        copyTasks[todolistId] = updatedArr
        setTasks(copyTasks)

        //setTasks({...tasks, [todolistId]: tasks[todolistId].map(sTask=>sTask.id===taskId ? {...sTask,title:newTaskTitle} : sTask)})
    }


    function deleteTodolist(todolistId: string) {
        setTodolistInfo(todolistInfo.filter((todolist) => todolist.id !== todolistId))
    }

    const tasksForTodolist = (todolist: TodolistInfo) => {
        switch (todolist.filter) {
            case "Active":
                return tasks[todolist.id].filter((sTask) => sTask.isDone === false)
            case "Completed" :
                return tasks[todolist.id].filter((sTask) => sTask.isDone === true)
            default:
                return tasks[todolist.id]
        }
    }


    const todolistsForRendering = todolistInfo.length
        ? todolistInfo.map((todolist) => {
            const tasks = tasksForTodolist(todolist)
            return (
                <Todolist key={todolist.id}
                          title={todolist.title}
                          tasks={tasks}
                          deleteTask={deleteTask}
                          changeTodoFilter={changeTodoFilter}
                          addTask={addTask}
                          changeDoneStatus={changeDoneStatus}
                          filter={todolist.filter}
                          deleteTodolist={deleteTodolist}
                          id={todolist.id}
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