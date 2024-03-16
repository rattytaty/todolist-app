import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {Add, AddBox} from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

type AddItemFormProps={
    addItem:(itemTitle:string)=>void
    disabled?:boolean
}

export const AddItemForm = React.memo((props:AddItemFormProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<boolean>(false)
    const addNewTask = () => {
        const noSpaceTaskName = newItemName.trim()
        if (noSpaceTaskName !== "") {
            props.addItem(noSpaceTaskName)
        } else {const iEl = inputRef.current as HTMLInputElement
            iEl.focus()
            !error && setError(true)
        }
        setNewItemName("")
    }
    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewItemName(event.currentTarget.value)
        error && setError(false)
    }
    const [newItemName, setNewItemName] = useState<string>("")
    const inputEnterPress = (event: KeyboardEvent<HTMLInputElement>) => event.key === "Enter" && addNewTask()
    const onBlurHandler = () =>{
        error && setError(false)
    }

    return <div>
            <TextField variant="outlined"
                       size="small"
                       label="Title"
//color={#626ed4}
                       sx={{input: {color:"#f3f3f3"}}}

                       disabled={props.disabled}
                       error={!!error}
                       value={newItemName}
                       onChange={inputOnChange}
                       onKeyDown={inputEnterPress}
                       helperText={error}
                       ref={inputRef}
                       onBlur={onBlurHandler}
                       placeholder={error?"Title is required":"Title"}/>

        <Button variant="contained"
                size="small"
                sx={{
                    background: "#626ed4",
                    color: "#f3f3f3",
                    "&:hover": {background: ""}
                }}
                onClick={addNewTask}
                disabled={props.disabled}>Add</Button>


        </div>

});

