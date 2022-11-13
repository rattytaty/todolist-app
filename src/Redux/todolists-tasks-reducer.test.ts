import {TodolistInfo, TasksArrays} from "../App";
import {AddTodoAC, DeleteTodoAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test("ids should be equals", ()=>{
    const startTasksState: TasksArrays = {}
    const startTodoState: Array<TodolistInfo> = []

    const action = AddTodoAC("New Todo")
    const finalTasksState = tasksReducer(startTasksState, action)
    const finalTodoState = todolistsReducer(startTodoState, action)

    const keys = Object.keys(finalTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = finalTodoState[0].id


    expect(idFromTasks).toBe(action.newTodoId)
    expect(idFromTodolists).toBe(action.newTodoId)

})

test("property with todolistId should be deleted", ()=>{
    const startState: TasksArrays = {
        "TodolistId1": [
            {id: "1", title: "Grid", isDone: false},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "REACT", isDone: false}],
        "TodolistId2": [
            {id: "1", title: "Sneakers", isDone: true},
            {id: "2", title: "Bag", isDone: false},
            {id: "3", title: "RTX4090", isDone: false}]
    }
const action = DeleteTodoAC("TodolistId2")
    const finalState = tasksReducer(startState, action)

    const keys = Object.keys(finalState)
    expect(keys.length).toBe(1)
    expect(finalState["TodolistId2"]).toBeUndefined()

})