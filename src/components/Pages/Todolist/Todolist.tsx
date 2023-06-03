import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../AddItemForm";
import {EditableSpan} from "../../EditableSpan";

import {TaskStatuses, TaskType} from "../../../api/tasks-api";

import {SingleTask} from "./SingleTask";
import {FormControl, IconButton, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {RequestStatusType} from "../../../Store/Reducers/app-reducer";
import {
    ChangeTodoFilterAC,
    ChangeTodoTitleTC,
    deleteTodoTC,
    FilterValuesType
} from "../../../Store/Reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../../Store/Store";
import {createTaskTC, getTasksTC,} from "../../../Store/Reducers/tasks-reducer";

type TodolistProps = {
    title: string
    filter: FilterValuesType
    entityStatus: RequestStatusType
    todolistId: string

}


export const Todolist: React.FC<TodolistProps> = React.memo(({title, filter, entityStatus, todolistId}) => {

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[todolistId])
    useEffect(() => {
        dispatch(getTasksTC(todolistId))
    }, [todolistId, dispatch])


    const changeTodoTitle = useCallback((newTodoTitle: string) => {
        dispatch(ChangeTodoTitleTC(newTodoTitle, todolistId))
    }, [dispatch, todolistId]);
    const addTask = useCallback((newTaskName: string) => {
        dispatch(createTaskTC(todolistId, newTaskName))
    }, [dispatch,todolistId]);

    const deleteTodolist = () => {
        dispatch(deleteTodoTC(todolistId))
    }
    const changeTodoFilter = (filterValue: FilterValuesType) => {
        dispatch(ChangeTodoFilterAC({filterValue, todolistId}))
    }

    const taskListItem = (Task: TaskType) => {
        return <SingleTask Task={Task}
                           todolistId={todolistId}
                           key={Task.id}/>
    }

    /*const tasksForTodolist =
        tasks && tasks.filter(({completed}) => {
            if (props.filter === "Active") return completed === false;
            else if (props.filter === "Completed") return completed === true;
            return true;
        })*/


    let tasksForTodolist: Array<TaskType> = tasks
    if (filter === "In progress") {
        tasksForTodolist = tasks.filter((Task) => Task.status === TaskStatuses.New)
    }
    if (filter === "Completed") {
        tasksForTodolist = tasks.filter((Task) => Task.status === TaskStatuses.Completed)
    }

    const taskList = tasksForTodolist && tasksForTodolist.length ? tasksForTodolist.map(taskListItem) : "Todolist is empty :("


    return <div>
        <Typography variant={"h5"}
                    align={"center"}>
            <EditableSpan editTitle={changeTodoTitle}
                          title={title}/>
            <IconButton onClick={deleteTodolist}
                        disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTask}
                     disabled={entityStatus === 'loading'}/>
        {taskList}
        <div style={{paddingTop: '10px'}}>
            <FormControl color={"primary"}
                         variant="filled"
                         fullWidth>
                <InputLabel id="demo-simple-select-filled-label">Sort Tasks:
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={filter}
                    onChange={() => changeTodoFilter}>
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"New"}>New</MenuItem>
                    <MenuItem value={"Draft"}>Draft</MenuItem>
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                    <MenuItem value={"In progress"}>In progress</MenuItem>
                </Select>
            </FormControl>
        </div>
    </div>
})

