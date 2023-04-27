import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "../api/tasks-api";


type SingleTaskProps = {
    sTask:TaskType
    deleteTask: (id: string) => void
    changeDoneStatus: (status:TaskStatuses, taskId: string) => void
    changeTaskTitle: (newTaskTitle: string, taskId: string) => void
}

export const SingleTask = React.memo((props:SingleTaskProps) => {



    const removeTask = () => props.deleteTask(props.sTask.id)
    const changeDoneStatus = (event: ChangeEvent<HTMLInputElement>) => {


        props.changeDoneStatus(event.currentTarget.checked?TaskStatuses.Completed:TaskStatuses.New, props.sTask.id)
    }
    const changeTaskTitle = useCallback((editedTitle: string) => {
        props.changeTaskTitle(editedTitle, props.sTask.id)
    },[props.sTask.id, props.changeTaskTitle])

    return (<li
        className={props.sTask.status===TaskStatuses.Completed ? "doneTask" : "notDoneTask"}
        key={props.sTask.id}>
        <input
            onChange={changeDoneStatus}
            type={"checkbox"}
            checked={props.sTask.status===TaskStatuses.Completed}/>
        <EditableSpan title={props.sTask.title} editTitle={changeTaskTitle}/>
        <button onClick={removeTask}>x</button>
    </li>)
})