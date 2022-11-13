
import {AddTodoAC} from "./todolists-reducer";
import {TasksArrays} from "../App";
import {addTaskAC, changeDoneStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./tasks-reducer";


let startState: TasksArrays = {
    "TodolistId1": [
        {id: "1", title: "Grid", isDone: false},
        {id: "2", title: "JS", isDone: false},
        {id: "3", title: "REACT", isDone: false}],
    "TodolistId2": [
        {id: "1", title: "Sneakers", isDone: true},
        {id: "2", title: "Bag", isDone: false},
        {id: "3", title: "RTX4070", isDone: false}]
}

beforeEach(()=>{

    startState = {
        "TodolistId1": [
            {id: "1", title: "Grid", isDone: false},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "REACT", isDone: false}],
        "TodolistId2": [
            {id: "1", title: "Sneakers", isDone: true},
            {id: "2", title: "Bag", isDone: false},
            {id: "3", title: "RTX4070", isDone: false}]
    }

})



test("task from array removed", ()=>{

    const action = deleteTaskAC("1","TodolistId2")

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "TodolistId1": [
            {id: "1", title: "Grid", isDone: false},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "REACT", isDone: false}],
        "TodolistId2": [
            {id: "2", title: "Bag", isDone: false},
            {id: "3", title: "RTX4070", isDone: false}]
    })

})

test("task added", ()=>{


    const action = addTaskAC ("Sneakers", "TodolistId2")

    const finalState = tasksReducer(startState, action)

    expect(finalState["TodolistId1"].length).toBe(3)
    expect(finalState["TodolistId2"].length).toBe(4)
    expect(finalState["TodolistId2"][0].id).toBeDefined()
    expect(finalState["TodolistId2"][0].title).toBe("Sneakers")
    expect(finalState["TodolistId2"][0].isDone).toBe(false)


})

test("done status of task changed",()=>{


    const action = changeDoneStatusAC ( true, "3","TodolistId2")

    const finalState = tasksReducer(startState, action)

    expect(finalState["TodolistId1"][2].isDone).toBe(false)
    expect(finalState["TodolistId2"][2].isDone).toBe(true)
    expect(finalState).toEqual({
        "TodolistId1": [
            {id: "1", title: "Grid", isDone: false},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "REACT", isDone: false}],
        "TodolistId2": [
            {id: "1", title: "Sneakers", isDone: true},
            {id: "2", title: "Bag", isDone: false},
            {id: "3", title: "RTX4070", isDone: true}]
    })


})


test("title of task changed",()=>{


    const action = changeTaskTitleAC ("RTX4090TI", "3","TodolistId2")

    const finalState = tasksReducer(startState, action)

    expect(finalState["TodolistId1"][2].title).toBe("REACT")
    expect(finalState["TodolistId2"][2].title).toBe("RTX4090TI")
    expect(finalState).toEqual({
        "TodolistId1": [
            {id: "1", title: "Grid", isDone: false},
            {id: "2", title: "JS", isDone: false},
            {id: "3", title: "REACT", isDone: false}],
        "TodolistId2": [
            {id: "1", title: "Sneakers", isDone: true},
            {id: "2", title: "Bag", isDone: false},
            {id: "3", title: "RTX4090TI", isDone: false}]
    })


})
test("new todo added", () =>{


    const action = AddTodoAC("New Todo")
    const finalState = tasksReducer(startState, action)

    const keys = Object.keys(finalState)
    const newKey = keys.find(k=> k !== "TodolistId1" && k !=="TodolistId2" )
    if (!newKey) {
        throw Error("new Key should be added")
    }

    expect(keys.length).toBe(3)
    expect(finalState[newKey]).toEqual([])

})