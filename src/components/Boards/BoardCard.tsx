import React, {MouseEvent, useCallback, useEffect, useState} from "react";
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Modal, Typography} from "@mui/material";
import {Cancel, Delete, Favorite} from "@mui/icons-material";
import {RequestStatusType} from "../../Store/Reducers/app-reducer";
import {BoardFilterValues, changeBoardTitleTC, deleteBoardTC} from "../../Store/Reducers/boards-reducer";
import {useAppDispatch, useAppSelector} from "../../Store/Store";
import {createTaskTC, getTasksTC,} from "../../Store/Reducers/tasks-reducer";
import {Task} from "./Task";
import {useNavigate} from "react-router-dom";
import {convertDate} from "../../Store/utils/converteDate";

type TodolistProps = {
    title: string
    filter: BoardFilterValues
    entityStatus: RequestStatusType
    boardId: string
}


export const BoardCard: React.FC<TodolistProps> = React.memo(({
                                                                  title,
                                                                  filter,
                                                                  entityStatus,
                                                                  boardId
                                                              }) => {

    const board = useAppSelector(state => state.todolistInfo.find(board => board.id === boardId))

    const {longDate} = convertDate(board!.addedDate)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks[boardId])
    useEffect(() => {
        dispatch(getTasksTC(boardId))
    }, [boardId, dispatch])
    const changeBoardTitle = useCallback((newBoardTitle: string) => {
        dispatch(changeBoardTitleTC(newBoardTitle, boardId))
    }, [dispatch, boardId]);
    const addTask = useCallback((newTaskName: string) => {
        dispatch(createTaskTC(boardId, newTaskName))
    }, [dispatch, boardId]);

    const taskListItem = (task: TaskType) => {
        return <Task task={task}
                     todolistId={boardId}
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

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const deleteBoard = () => {
        dispatch(deleteBoardTC(boardId))
        setDeleteModalOpen(false)
    }
    const openDeleteBoardModal = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setDeleteModalOpen(true)
    }

    const deleteModalOnClose = (event: MouseEvent) => {
        event.stopPropagation()
        setDeleteModalOpen(false)
    }

    const cancelDeleteBoardModal = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setDeleteModalOpen(false)
    }

    return <Card onClick={() => navigate(`board/${boardId}`)} sx={{
        background: "#2a3142",
        borderRadius: 1,
        "&:hover": {
            boxShadow: 14,
            outline: "1px solid #626ed4",
            cursor: "pointer"
        }
    }}>

        <CardHeader title={<Typography sx={{color: "#f3f3f3"}}
                                       variant="h5">
            {title}</Typography>}/>

        <CardContent sx={{mt: -2,}}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography sx={{color: "#bfc1c7"}}>
                    {tasks.length ? `${tasks.length} tasks:`
                        : "No tasks yet."}</Typography>
            </Box>
            <Box onClick={event => event.stopPropagation()}>
                {tasks.map(task => <Task task={task}
                                         todolistId={boardId}
                                         key={task.id}/>)}
            </Box>
            <Typography sx={{color: "#bfc1c7"}}>{longDate}</Typography>
        </CardContent>


        {/*<AddItemForm addItem={addTask}
                     disabled={entityStatus === 'loading'}/>
        <SelectFilter todolistId={todolistId} filter={filter}/>*/}

        <CardActions sx={{
            mt: -2,
            display: "flex",
            justifyContent: "space-between"
        }}>
            <IconButton sx={{
                ml: -0.5,
                color: "#626ed4",
                "&:hover": {
                    background: "#242a38"
                }
            }}
                        onClick={openDeleteBoardModal}
                        disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>

            <IconButton sx={{
                mr: -0.5,
                color: "#626ed4",
                "&:hover": {
                    background: "#242a38"
                }
            }}
                        onClick={event => event.stopPropagation()}
                        disabled={entityStatus === 'loading'}>
                <Favorite/>
            </IconButton>

            <Modal open={deleteModalOpen}
                   onClose={deleteModalOnClose}>
                <Box sx={{
                    position: "absolute",
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 24,
                    p: 2,
                    background: "#2a3142",
                    borderRadius: 1,
                    width: 300,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Typography variant="h6"
                                sx={{color: "#f3f3f3"}}>Delete this board?</Typography>

                    <Box sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        mt: 2
                    }}>
                        <Button variant="contained"
                                size="small"
                                sx={{
                                    background: "#626ed4",
                                    color: "#f3f3f3",
                                    "&:hover": {background: "#3e49b2"}
                                }}
                                endIcon={<Delete/>}
                                onClick={deleteBoard}>Delete</Button>
                        <Button variant="contained"
                                size="small"
                                sx={{
                                    background: "#626ed4",
                                    color: "#f3f3f3",
                                    "&:hover": {background: "#3e49b2"}
                                }}
                                endIcon={<Cancel/>}
                                onClick={cancelDeleteBoardModal}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </CardActions>
    </Card>
})

