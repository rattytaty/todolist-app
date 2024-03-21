import React, {useCallback, useEffect, useState} from "react";
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Modal, Typography} from "@mui/material";
import {Cancel, Delete, Favorite} from "@mui/icons-material";
import {RequestStatusType} from "../../Store/Reducers/app-reducer";
import {changeBoardTitleTC, deleteBoardTC, BoardFilterValues} from "../../Store/Reducers/boards-reducer";
import {useAppDispatch, useAppSelector} from "../../Store/Store";
import {createTaskTC, getTasksTC,} from "../../Store/Reducers/tasks-reducer";
import {Task} from "./Task";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { AddItemForm } from "../AddItemForm";
import {useNavigate} from "react-router-dom";

type TodolistProps = {
    title: string
    filter: BoardFilterValues
    entityStatus: RequestStatusType
    boardId: string
}

const convertDate = (dateToConvert: string) => {
    const [date, time] = dateToConvert.split("T")
    const [year, month, day] = date.split("-")
    const shortDate = `${day}.${month}`
    const longDate = `${day}.${month}.${year}`
    const convertedTime = time.slice(0, 5)
    return {shortDate, longDate, convertedTime}
}
export const Board: React.FC<TodolistProps> = React.memo(({
                                                              title,
                                                              filter,
                                                              entityStatus,
                                                               boardId
                                                          }) => {

    const board = useAppSelector(state => state.todolistInfo.find(board=>board.id===boardId))

    const {shortDate, longDate, convertedTime} = convertDate(board!.addedDate)

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
    const tasksList = tasksForTodolist && tasksForTodolist.length ? tasksForTodolist.map(taskListItem) : "Todolist is empty :("

    const [isDetailsOpen, setIsDetailsOpen] = useState(false)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const deleteBoard = () => {
        dispatch(deleteBoardTC(boardId))
        setDeleteModalOpen(false)
    }

    return <Card onClick={()=>navigate("/settings")} sx={{
        background: "#2a3142",
        borderRadius: 1,
        "&:hover": {
           cursor:"pointer",
            boxShadow: 14,
        }
    }}>
        <CardHeader title={<Typography sx={{color: "#f3f3f3"}}
                                       variant="h5"
                                       component="div">
            {title}</Typography>}/>


        <CardContent sx={{mt: -2,}}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography sx={{color: "#bfc1c7"}}>
                    {tasks.length?`${tasks.length} tasks`:"No tasks yet."}</Typography>

                {tasks.length?<IconButton onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                            sx={{
                                mr: -1.5,
                                color: "#626ed4",
                                "&:hover": {
                                    background: "#242a38"
                                }
                            }}>
                    {isDetailsOpen
                        ? <ExpandLess/>
                        : <ExpandMore/>}
                </IconButton>:undefined}
            </Box>

            <Collapse in={isDetailsOpen}
                      timeout="auto">
                {tasks.map(task=><Task task={task}
                                       todolistId={boardId}
                                       key={task.id}/>)}

            </Collapse>


            <Typography sx={{
                color: "#bfc1c7"
            }}>{longDate}</Typography>
        </CardContent>


        {/*<AddItemForm addItem={addTask}
                     disabled={entityStatus === 'loading'}/>
        <SelectFilter todolistId={todolistId} filter={filter}/>*/}

        <CardActions sx={{mt: -2,
            display: "flex",
            justifyContent: "space-between"}}>

            <IconButton sx={{
                ml: -0.5,
                color: "#626ed4",
                "&:hover": {
                    background: "#242a38"
                }
            }}
                        onClick={() => setDeleteModalOpen(true)}
                        disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>

            <IconButton sx={{
                mr: -0.5,
                color: "#626ed4",
                "&:hover": {
                    background: "#242a38"
                }
            }} disabled={entityStatus === 'loading'}>
                <Favorite/>
            </IconButton>

            <Modal open={deleteModalOpen}
                   onClose={() => setDeleteModalOpen(false)}
            >
                <Box sx={{position:"absolute",
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 24,
                    p: 2,
                    background:"#2a3142",
                    borderRadius:1,
                    width: 300,
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center"
                }}>
                    <Typography variant="h6"
                                sx={{color:"#f3f3f3"}}>Delete this board?</Typography>

                    <Box sx={{display:"flex",
                        width:"100%",
                        justifyContent:"space-between",
                        mt:2}}>
                        <Button variant="contained"
                                size="small"
                                sx={{background: "#626ed4",
                                    color: "#f3f3f3",
                                    "&:hover": {background: "#3e49b2"}
                                }}
                                endIcon={<Delete/>}
                                onClick={deleteBoard}>Delete</Button>
                        <Button variant="contained"
                                size="small"
                                sx={{background: "#626ed4",
                                    color: "#f3f3f3",
                                    "&:hover": {background: "#3e49b2"}
                                }}
                                endIcon={<Cancel/>}
                                onClick={()=>setDeleteModalOpen(false)}>Cancel</Button>
                    </Box>


                </Box>
            </Modal>

        </CardActions>
    </Card>
})

