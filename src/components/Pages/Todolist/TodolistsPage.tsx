import React, {useCallback, useEffect} from "react";

import {TodolistMainType} from "../../../api/todolists-api";
import {AddItemForm} from "../../AddItemForm";
import {Todolist} from "./Todolist";
import {Grid, Paper} from "@mui/material";
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


    return <>
        <Grid container
              style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container
              spacing={3}>
            {todolistInfo.map(todolist => {
                return <Grid item
                             key={todolist.id}>
                    <Paper style={{padding: '10px'}}>
                        <Todolist title={todolist.title}
                                  todolistId={todolist.id}
                                  filter={todolist.filter}
                                  entityStatus={todolist.entityStatus}/>
                    </Paper>
                </Grid>
            })}
        </Grid>
    </>
}