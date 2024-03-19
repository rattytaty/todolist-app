import React, {ChangeEvent, useState} from 'react';
import {TaskStatuses, TaskType} from "../../../api/tasks-api";
import {EditableSpan} from "../../EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {deleteTaskTC, updateTaskTC} from "../../../Store/Reducers/tasks-reducer";
import {useAppDispatch} from "../../../Store/Store";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {TaskInfo} from "./TaskInfo";

type SingleTaskProps = {
    task: TaskType
    todolistId:string
}

export const Task:React.FC<SingleTaskProps> = React.memo(({task, todolistId}) => {
    const dispatch = useAppDispatch()
const [editMode, setEditMode] = useState<boolean>(false)

    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todolistId, task.id, {status:event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC(todolistId, task.id, {title}))
    }
    const deleteTask =() => {
        dispatch(deleteTaskTC(todolistId, task.id))
    }
    

    return <div key={task.id}
                className={task.status === TaskStatuses.Completed
                    ? 'doneTask'
                    : 'notDoneTask'}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={changeTaskStatus}
        />

        <EditableSpan title={task.title}
                      editTitle={changeTaskTitle}/>
        <IconButton onClick={()=>setEditMode(!editMode)}>
            {editMode?<KeyboardArrowDownIcon/>:<KeyboardArrowUpIcon />}
        </IconButton>



        <IconButton style={{float: "right"}} onClick={deleteTask}>
            <Delete />
        </IconButton>
        {editMode?<TaskInfo/>:null}

    </div>
})
