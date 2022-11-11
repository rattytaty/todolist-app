import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps ={
    title: string
    editTitle:(changedTitle:string)=>void
}

export const EditableSpan = (props:EditableSpanProps) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.editTitle(title)
    }
    const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)

    }

    return (
        editMode
            ? <input autoFocus onBlur={offEditMode} value={title} onChange={inputOnChange}/>
            :<span onDoubleClick={onEditMode}>{title}</span>
    );
};
