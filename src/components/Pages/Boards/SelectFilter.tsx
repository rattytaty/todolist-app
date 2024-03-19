import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {ChangeTodoFilterAC, BoardFilterValues} from "../../../Store/Reducers/todolists-reducer";
import {useAppDispatch} from "../../../Store/Store";

type SelectFilterProps = {
    todolistId:string
    filter:BoardFilterValues
}

export const SelectFilter: React.FC<SelectFilterProps> = React.memo(({todolistId, filter}) => {

    const dispatch = useAppDispatch()
    const changeTodoFilter = (filterValue: BoardFilterValues) => {
        dispatch(ChangeTodoFilterAC({filterValue, todolistId}))
    }
    return (
        <div style={{paddingTop: '10px'}}>
            <FormControl size={"small"} color={"primary"}
                         variant="filled"
                         fullWidth>
                <InputLabel id="demo-simple-select-filled-label">Sort Tasks:
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={filter}>
                    <MenuItem onClick={()=>changeTodoFilter("All")} value={"All"}>All</MenuItem>
                    <MenuItem onClick={()=>changeTodoFilter("New")} value={"New"}>New</MenuItem>
                    <MenuItem onClick={()=>changeTodoFilter("Draft")} value={"Draft"}>Draft</MenuItem>
                    <MenuItem onClick={()=>changeTodoFilter("Completed")} value={"Completed"}>Completed</MenuItem>
                    <MenuItem onClick={()=>changeTodoFilter("In progress")} value={"In progress"}>In progress</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
})
