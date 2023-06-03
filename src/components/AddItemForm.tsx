import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";

type AddItemFormProps={
    addItem:(itemTitle:string)=>void
    disabled?:boolean
}

export const AddItemForm = React.memo((props:AddItemFormProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<boolean>(false)
    const addNewTask = () => {
        const noSpaceTaskName = newTaskName.trim()
        if (noSpaceTaskName !== "") {
            props.addItem(noSpaceTaskName)
        } else {const iEl = inputRef.current as HTMLInputElement
            iEl.focus()
            !error && setError(true)
        }
        setNewTaskName("")
    }
    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(event.currentTarget.value)
        error && setError(false)
    }
    const [newTaskName, setNewTaskName] = useState<string>("")
    const inputEnterPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addNewTask()
    const onBlurHandler = () =>{
        error && setError(false)
    }

    return <div>
            <TextField variant="outlined"
                       disabled={false}
                       error={!!error}
                       value={newTaskName}
                       onChange={inputOnChange}
                       onKeyDown={inputEnterPress}
                       helperText={error}
                       ref={inputRef}
                       size={"small"}
                       onBlur={onBlurHandler}
                       placeholder={error?"Title is required":"Title"}/>
            <IconButton color="primary"
                        onClick={addNewTask}
                        disabled={props.disabled}>
                <AddBox />
            </IconButton>
        </div>

});

