import React, {useCallback, useEffect, useState} from "react";

import {BoardMainType} from "../../api/boards-api";
import {AddItemForm} from "../AddItemForm";
import {Board} from "./Board";
import {useAppDispatch, useAppSelector} from "../../Store/Store";
import {createBoardTC, getAllBoardsTC} from "../../Store/Reducers/boards-reducer";
import {
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    IconButton,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Stack,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {EditCalendar, Favorite} from "@mui/icons-material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Link as RouterLink,} from 'react-router-dom';
import Grid from "@mui/material/Grid";

export const BoardsPage: React.FC = () => {

    const todolistInfo = useAppSelector<Array<BoardMainType>>(state => state.todolistInfo)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getAllBoardsTC())
        }
    }, [isLoggedIn, dispatch])

    const addTodolist = useCallback((newTodoTitle: string) => {
        dispatch(createBoardTC(newTodoTitle))
    }, [dispatch])

    const [sortValue, setSortValue] = useState<string>("Added date")

    const [isFavouriteOpen, setIsFavouriteOpen] = useState(false)

    return <>
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundImage: "linear-gradient(112.1deg, #2b2c4f 11.4%, #354269 70.2%)",
            height: "130px",
        }}>
            <Breadcrumbs separator={<NavigateNextIcon
                fontSize="small"/>}
                         sx={{m: 2}}>
                <Link component={RouterLink}
                      to="/"
                      variant="h6"
                      underline="hover"
                      sx={{
                          color: "#bfc1c7",
                          "&:hover": {color: "#626ed4"}
                      }}>
                    Home</Link>
                <Typography sx={{color: "#f3f3f3"}}
                            variant="h6">
                    All boards</Typography>
            </Breadcrumbs>
            <Box sx={{
                alignSelf: " flex-end",
                m: 2,
                color: "#fafafa",
                display: "flex",
                alignItems: "center",
                gap: 0.5
            }}>
                <EditCalendar fontSize="small"/>
                <Typography>09.12.2011</Typography>
            </Box>
        </Box>
        <Button variant="contained"
                size="small"
                sx={{
                    ml: 2,
                    mt: 2,
                    background: "#626ed4",
                    color: "#f3f3f3",
                    "&:hover": {background: "#3e49b2"}
                }}
                endIcon={isFavouriteOpen
                    ? <ExpandLess sx={{color: "#f3f3f3"}}/>
                    : <ExpandMore sx={{color: "#f3f3f3"}}/>}
                onClick={() => setIsFavouriteOpen(!isFavouriteOpen)}>Favorite boards</Button>
        <Collapse in={isFavouriteOpen}
                  timeout="auto">
            <Stack sx={{
                width: "100%",
                overflowX: "auto",
                mx: 2,
                mt: 2,
            }}
                   direction="row"
                   spacing={2}>
                <Card sx={{
                    minWidth: "160px",
                    height: "min-content",
                    background: "#2a3142",
                    transition: "background-color 0.3s",
                    cursor: "pointer",
                    "&:hover": {
                        //background: "#f3f3f3"
                    },
                }}>
                    <CardContent>
                        <Typography sx={{color: "#f3f3f3"}}
                                    variant="h5"
                                    component="div">
                            Project 1
                        </Typography>
                        <Typography sx={{color: "#bfc1c7"}}>
                            2 tasks
                        </Typography>
                    </CardContent>
                    <CardActions sx={{mt: -2}}>
                        <Typography sx={{
                            ml: 1,
                            color: "#bfc1c7"
                        }}>09.02.2021</Typography>
                        <IconButton sx={{marginLeft: "auto"}}>
                            <Favorite/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Stack>
        </Collapse>

        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 2,
        }}>
            <AddItemForm addItem={addTodolist}/>
            <FormControl sx={{width: "110px"}}
                         variant="standard">
                <InputLabel sx={{color: "#626ed4"}}>Sort by</InputLabel>
                <Select sx={{
                    color: "#fafafa",
                    /*'&:before': {borderColor: "#626ed4"},
                                    '&:after': {borderColor: "#626ed4"},*/
                }}
                        label="Sort by"
                        size="small"
                        value={sortValue}
                        onChange={event => setSortValue(event.target.value)}>
                    <MenuItem value="Added date">Added date</MenuItem>
                    <MenuItem value="Order">Order</MenuItem>
                    <MenuItem value="Name">Name</MenuItem>
                </Select>
            </FormControl>
        </Box>
        <Typography sx={{
            color: "#f3f3f3",
            mx: 2,
            my: -1
        }}
                    variant="h6">Your Boards:</Typography>
        <Grid container
              columns={{
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3
              }}
              spacing={2}
              sx={{
                  px: 2,
                  py: 1
              }}>
            {todolistInfo.map(board => {
                return <Grid xs={1}
                             sm={1}
                             md={1}
                             lg={1}
                             item
                             key={board.id}>
                    <Board title={board.title}
                           boardId={board.id}
                           filter={board.filter}
                           entityStatus={board.entityStatus}/>
                </Grid>
            })}
        </Grid>

    </>
}