import React, {useCallback, useEffect, useState} from "react";

import {TodolistMainType} from "../../../api/todolists-api";
import {AddItemForm} from "../../AddItemForm";
import {Todolist} from "./Todolist";
import {useAppDispatch, useAppSelector} from "../../../Store/Store";
import {CreateTodoTC, getTodosThunkTC} from "../../../Store/Reducers/todolists-reducer";

export const TodolistsPage: React.FC = () => {
    const todolistInfo = useAppSelector<Array<TodolistMainType>>(state => state.todolistInfo)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodosThunkTC())
        }
    }, [isLoggedIn, dispatch])

    const addTodolist = useCallback((newTodoTitle: string) => {
        dispatch(CreateTodoTC(newTodoTitle))
    }, [dispatch])

    const [filterValue, setFilterValue] = useState()
    const [sortValue, setSortValue] = useState()


    return <>

        <AddItemForm addItem={addTodolist}/>
            {todolistInfo.map(todolist => {
                return <Todolist title={todolist.title}
                              key={todolist.id}
                              todolistId={todolist.id}
                              filter={todolist.filter}
                              entityStatus={todolist.entityStatus}/>

            })}
    </>
}