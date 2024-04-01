import {Box, Button, Dialog, Divider, FormControl, InputLabel, MenuItem, Select, Typography} from '@mui/material';
import React, {useState} from 'react';
import {HeaderBackground} from "./HeaderBackground";
import {Add as AddIcon, Favorite as FavoriteIcon} from "@mui/icons-material";
import {useFormik} from "formik";

export const BoardPage = () => {

    const [sortByValue, setSortByValue] = useState("")
    const [filterValue, setFilterValue] = useState("")

    const [isNewTaskFormOpen, setIsNewTaskFormOpen] = useState(false)

    const openNewTaskForm = () => {
        setIsNewTaskFormOpen(true)
    }
    const closeNewTaskForm = () => {
        setIsNewTaskFormOpen(false)
    }

    const formik = useFormik({
        initialValues:{

        },
        onSubmit:values => {},
    })

    return <>
        <HeaderBackground/>
        <Box sx={{
            background: "#2a3142",
            borderRadius: 1,
            p: 1,
            m: 2
        }}>
            <Box>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Typography sx={{
                        color: "#bfc1c7",
                        width: 100
                    }}>Priority</Typography>
                    <Divider sx={{
                        background: "#f3f3f3",
                        height: "14px",
                        m: 1
                    }}
                             variant="middle"
                             orientation="vertical"
                             flexItem/>
                    <Typography sx={{color: "#f3f3f3"}}>High</Typography>
                </Box>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Typography sx={{
                        color: "#bfc1c7",
                        width: 100
                    }}>Added date</Typography>
                    <Divider sx={{
                        background: "#f3f3f3",
                        height: "14px",
                        m: 1
                    }}
                             variant="middle"
                             orientation="vertical"
                             flexItem/>
                    <Typography sx={{color: "#f3f3f3"}}>09.12.2011</Typography>
                </Box>

                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                }}>
                    <Typography sx={{color: "#bfc1c7", width: 100}}>Something</Typography>
                    <Divider sx={{background: "#f3f3f3", height: "14px", m: 1}} variant="middle" orientation="vertical"
                             flexItem/>
                    <Typography sx={{color: "#f3f3f3"}}>something</Typography>
                </Box>


            </Box>

            <Dialog sx={{
                '& .MuiPaper-root': {
                    background: "#2a3142",
                    p:2
                }

            }}
                    open={isNewTaskFormOpen}
                    onClose={closeNewTaskForm}>
                 <Typography variant="h5" sx={{color: "#bfc1c7"}}>Create a new Task:</Typography>


                <button>Create</button>
                <button>Cancel</button>
            </Dialog>


            <Button variant="contained"
                    size="small"
                    sx={{
                        background: "#626ed4",
                        color: "#f3f3f3",
                        "&:hover": {background: "#3e49b2"}
                    }}
                    endIcon={<FavoriteIcon/>}
                    onClick={() => {
                    }}>Mark as favourite</Button>

            <Button variant="contained"
                    size="small"
                    sx={{
                        background: "#626ed4",
                        color: "#f3f3f3",
                        "&:hover": {background: "#3e49b2"}
                    }}
                    endIcon={<AddIcon/>}
                    onClick={openNewTaskForm}>Add new task</Button>


            <FormControl sx={{width: "110px"}}
                         variant="standard">
                <InputLabel sx={{color: "#626ed4"}}>Filter</InputLabel>
                <Select sx={{
                    color: "#fafafa",
                }}
                        label="Filter"
                        size="small"
                        value={filterValue}
                        onChange={event => setFilterValue(event.target.value)}>
                    <MenuItem value="Added date">Added date</MenuItem>
                    <MenuItem value="Order">Order</MenuItem>
                    <MenuItem value="Name">Name</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{width: "110px"}}
                         variant="standard">
                <InputLabel sx={{color: "#626ed4"}}>Sort by</InputLabel>
                <Select sx={{
                    color: "#fafafa",
                }}
                        label="Sort by"
                        size="small"
                        value={sortByValue}
                        onChange={event => setSortByValue(event.target.value)}>
                    <MenuItem value="Added date">Added date</MenuItem>
                    <MenuItem value="Order">Order</MenuItem>
                    <MenuItem value="Name">Name</MenuItem>
                </Select>
            </FormControl>

        </Box>
    </>
};
