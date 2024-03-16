import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../AddItemForm";
import {TaskStatuses, TaskType} from "../../../api/tasks-api";
import {Card, IconButton, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {RequestStatusType} from "../../../Store/Reducers/app-reducer";
import {ChangeTodoTitleTC, deleteTodoTC, FilterValuesType} from "../../../Store/Reducers/todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../../Store/Store";
import {createTaskTC, getTasksTC,} from "../../../Store/Reducers/tasks-reducer";
import {SelectFilter} from "./SelectFilter";
import {Task} from "./Task";

type TodolistProps = {
    title: string
    filter: FilterValuesType
    entityStatus: RequestStatusType
    todolistId: string
}

export const Board: React.FC<TodolistProps> = React.memo(({
                                                                 title,
                                                                 filter,
                                                                 entityStatus,
                                                                 todolistId,
                                                                 ...restProps
                                                             }) => {

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
    }, [dispatch, todolistId]);
    const deleteTodolist = () => {
        dispatch(deleteTodoTC(todolistId))
    }
    const taskListItem = (task: TaskType) => {
        return <Task task={task}
                     todolistId={todolistId}
                     key={task.id}/>
    }

    const tasksForTodolist =
        tasks && tasks.filter(({status}) => {
            if (filter === "New") return status === TaskStatuses.New;
            else if (filter === "Completed") return status === TaskStatuses.Completed;
            else if (filter === "In progress") return status === TaskStatuses.InProgress;
            else if (filter === "Draft") return status === TaskStatuses.Draft;
            return true;
        })
    const tasksList = tasksForTodolist && tasksForTodolist.length ? tasksForTodolist.map(taskListItem) : "Todolist is empty :("

    return <Card sx={{p:1,background:"#626ed4",}}>
        <Typography variant="h5"
                    align="center">
            {title}
            <IconButton  onClick={deleteTodolist}
                        disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </Typography>
        <AddItemForm addItem={addTask}
                     disabled={entityStatus === 'loading'}/>
        {tasksList}
        <SelectFilter todolistId={todolistId} filter={filter}/>
    </Card>
})

