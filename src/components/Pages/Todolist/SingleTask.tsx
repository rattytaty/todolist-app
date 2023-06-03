import React, {ChangeEvent} from 'react';
import {TaskStatuses, TaskType} from "../../../api/tasks-api";
import {EditableSpan} from "../../EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {deleteTaskTC, updateTaskTC} from "../../../Store/Reducers/tasks-reducer";
import {useAppDispatch} from "../../../Store/Store";


type SingleTaskProps = {
    Task: TaskType

    todolistId:string
}

export const SingleTask:React.FC<SingleTaskProps> = React.memo(({Task, todolistId}) => {
    const dispatch = useAppDispatch()


    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskTC(todolistId, Task.taskId, {status:event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }

    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC(todolistId, Task.taskId, {title}))
    }

    const deleteTask =() => {
        dispatch(deleteTaskTC(todolistId, Task.taskId))
    }


    return <div key={Task.taskId}
                className={Task.status === TaskStatuses.Completed
                    ? 'doneTask'
                    : 'notDoneTask'}>
        <Checkbox
            checked={Task.status === TaskStatuses.Completed}
            color="primary"
            onChange={changeTaskStatus}
        />

        <EditableSpan title={Task.title}
                      editTitle={changeTaskTitle}/>
        <IconButton onClick={deleteTask}>
            <Delete/>
        </IconButton>
    </div>
})