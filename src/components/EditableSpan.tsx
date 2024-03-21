import React, {ChangeEvent, useState} from 'react';
import {TextField, Typography} from "@mui/material";

type EditableSpanProps ={
    title: string
    editTitle:(changedTitle:string)=>void
}

export const EditableSpan = React.memo((props:EditableSpanProps) =>{
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        props.editTitle(title)
        setEditMode(false)
    }
    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        editMode
            ?<TextField autoFocus
                         onBlur={offEditMode}
                         value={title}
                         onChange={inputOnChange}
                         size={"small"}/>
            :<Typography sx={{color:"#f3f3f3"}} onDoubleClick={onEditMode}>{title}</Typography>
    );
});
