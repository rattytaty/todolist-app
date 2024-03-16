import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';
import {Button, TextField} from "@mui/material";
import Box from "@mui/material/Box";

type AddItemFormProps = {
    addItem: (itemTitle: string) => void
    disabled?: boolean
    placeholderText?: string
}

export const AddItemForm = React.memo((props: AddItemFormProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<boolean>(false)
    const addNewTask = () => {
        const noSpaceTaskName = newItemName.trim()
        if (noSpaceTaskName !== "") {
            props.addItem(noSpaceTaskName)
        } else {
            const iEl = inputRef.current as HTMLInputElement
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
    const onBlurHandler = () => {
        error && setError(false)
    }

    return <Box sx={{display: "flex", alignItems:"center"}}>
        <TextField sx={{input: {color: "#f3f3f3",
                '&::placeholder': {
                    color: "#bfc1c7"
                }},
                       '& .MuiInputBase-root': {
                           height:31
                       },
                   }}
                   //color="#626ed4"
                   disabled={props.disabled}
                   error={!!error}
                   value={newItemName}
                   onChange={inputOnChange}
                   onKeyDown={inputEnterPress}
                   helperText={error}
                   ref={inputRef}
                   onBlur={onBlurHandler}
                   placeholder={error ? "Title is required!" : (props.placeholderText ? props.placeholderText : "Title")}/>

        <Button variant="contained"
                size="small"
                sx={{
                    background: "#626ed4",
                    color: "#f3f3f3",
                    "&:hover": {background: "#3e49b2"}
                }}
                onClick={addNewTask}
                disabled={props.disabled}>
            Add</Button>

    </Box>
});

