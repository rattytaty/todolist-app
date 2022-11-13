
import {FilterValuesType, TodolistInfo} from "../App";
import {AddTodoAC, ChangeTodoFilterAC, ChangeTodoTitleAC, DeleteTodoAC, todolistsReducer} from "./todolists-reducer";

let TodolistId1:string = "TodolistId1"
let TodolistId2:string = "TodolistId2"
let startState: Array<TodolistInfo> = [
    {id: TodolistId1, title: "What to learn", filter: "All"},
    {id: TodolistId2, title: "What to buy", filter: "All"}
]

beforeEach(()=>{
    const TodolistId1 = "TodolistId1"
    const TodolistId2 = "TodolistId2"
    const startState = [
        {id: TodolistId1, title: "What to learn", filter: "All"},
        {id: TodolistId2, title: "What to buy", filter: "All"}
    ]
})


test("todo removed", ()=>{


    const finalState = todolistsReducer(startState, DeleteTodoAC(TodolistId1) )

    expect(finalState.length).toBe(1);
    expect(finalState[0].id).toBe(TodolistId2);


})
test("new todo added", ()=>{

    const newTodoTitle = "New Todo"
    const finalState = todolistsReducer(startState, AddTodoAC(newTodoTitle))

    expect(finalState.length).toBe(3);
    expect(finalState[2].title).toBe(newTodoTitle);

})
test("todo filter changed", ()=>{

    const newFilter:FilterValuesType = "Active"

    const finalState = todolistsReducer(startState, ChangeTodoFilterAC(newFilter, TodolistId2))

    expect(finalState).toEqual([
        {id: TodolistId1, title: "What to learn", filter: "All"},
        {id: TodolistId2, title: "What to buy", filter: "Active"}
    ])
})
test("todo name changed", () =>{
    const NewTodoTitle = "NewTodoTitle"

    const finalState = todolistsReducer(startState, ChangeTodoTitleAC( TodolistId1,NewTodoTitle))
expect(finalState).toEqual([
    {id: TodolistId1, title: "NewTodoTitle", filter: "All"},
    {id: TodolistId2, title: "What to buy", filter: "All"}
])
    expect(finalState[0].title).toBe(NewTodoTitle)
})