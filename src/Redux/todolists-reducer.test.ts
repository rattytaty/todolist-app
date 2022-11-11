import {v1} from "uuid";
import {FilterValuesType, TodolistInfo} from "../App";
import {AddTodoAC, ChangeTodoFilterAC, ChangeTodoNameAC, DeleteTodoAC, todolistsReducer} from "./todolists-reducer";

export {}
test("todo removed", ()=>{
    const TodolistId1 = v1()
    const TodolistId2 = v1()

    const startState: Array<TodolistInfo> = [
        {id: TodolistId1, title: "What to learn", filter: "All"},
        {id: TodolistId2, title: "What to buy", filter: "All"}
    ]

    const finalState = todolistsReducer(startState, DeleteTodoAC(TodolistId1) )

    expect(finalState.length).toBe(1);
    expect(finalState[0].id).toBe(TodolistId2);


})
test("new todo added", ()=>{
    const TodolistId1 = v1()
    const TodolistId2 = v1()
    const newTodoTitle = "New Todo"
    const startState: Array<TodolistInfo> = [
        {id: TodolistId1, title: "What to learn", filter: "All"},
        {id: TodolistId2, title: "What to buy", filter: "All"}
    ]

    const finalState = todolistsReducer(startState, AddTodoAC(newTodoTitle))

    expect(finalState.length).toBe(3);
    expect(finalState[2].title).toBe(newTodoTitle);

})
test("todo filter changed", ()=>{
    const TodolistId1 = v1()
    const TodolistId2 = v1()
    const newFilter:FilterValuesType = "Active"
    const startState: Array<TodolistInfo> = [
        {id: TodolistId1, title: "What to learn", filter: "All"},
        {id: TodolistId2, title: "What to buy", filter: "All"}
    ]
    const finalState = todolistsReducer(startState, ChangeTodoFilterAC(newFilter, TodolistId2))
})
test("todo name changed", () =>{
    const TodolistId1 = v1()
    const TodolistId2 = v1()
    const NewTodoTitle = "NewTodoTitle"
    const startState: Array<TodolistInfo> = [
        {id: TodolistId1, title: "What to learn", filter: "All"},
        {id: TodolistId2, title: "What to buy", filter: "All"}
    ]

    const finalState = todolistsReducer(startState, ChangeTodoNameAC( TodolistId1,NewTodoTitle))

})