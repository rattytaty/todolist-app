import React, {ChangeEvent} from 'react';
import {TaskStatuses, TaskType} from "../../api/tasks-api";
import {Checkbox, Typography} from "@mui/material";
import {deleteTaskTC, updateTaskTC} from "../../Store/Reducers/tasks-reducer";
import {useAppDispatch} from "../../Store/Store";
import Box from "@mui/material/Box";

type TaskProps = {
    task: TaskType
    todolistId: string
}

export const Task: React.FC<TaskProps> = React.memo(({task, todolistId}) => {
    const dispatch = useAppDispatch()

    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todolistId, task.id, {status: event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC(todolistId, task.id, {title}))
    }
    const deleteTask = () => {
        dispatch(deleteTaskTC(todolistId, task.id))
    }

    return <Box sx={{display: "flex",
        alignItems: "center"}}>
        <Checkbox checked={task.status === TaskStatuses.Completed}
                  onChange={changeTaskStatus}
                  sx={{color: "#626ed4",
                      "& .MuiSvgIcon-root": {fill: "#626ed4"},
                      "&:hover": {background: "#242a38"}
        }}
        />
        <Typography sx={{color: "#f3f3f3"}}>{task.title}</Typography>
    </Box>
})
