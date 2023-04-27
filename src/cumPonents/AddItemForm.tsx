import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react';

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
    const errorMessage = error ? <div className={"errorMessage"}> Title is required </div> : null
    const onBlurHandler = () =>{
        error && setError(false)
    }

    return (
        <div>
            <input
                className={ error ?"inputError" : ""}
                value={newTaskName}
                onChange={inputOnChange}
                onKeyDown={inputEnterPress}
                onBlur={onBlurHandler}
                ref={inputRef}
                disabled={props.disabled}
            />

            <button onClick={addNewTask} disabled={props.disabled}>+</button>
            {errorMessage}
        </div>
    );
});
