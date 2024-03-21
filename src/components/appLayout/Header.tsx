import React, {MouseEvent, useCallback, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {Checklist, ExpandLess as LessIcon, ExpandMore as MoreIcon, Logout} from "@mui/icons-material";
import {Avatar, Button, Popover, Typography} from "@mui/material";
import Box from "@mui/material/Box";

import AppBar from "@mui/material/AppBar";
import {useAppDispatch} from "../../Store/Store";
import {logOutTC} from "../../Store/Reducers/auth-reducer";
import {useNavigate} from "react-router-dom";

type HeaderProps = {
    handleDrawerToggle: () => void
}

export const Header = (props: HeaderProps) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const logoutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [dispatch])
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handlePopoverClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;


    return <AppBar component="nav"
                   sx={{
                       background: "#36394c",
                       zIndex: (theme) => theme.zIndex.drawer + 1
                   }}>
        <Toolbar sx={{ml:-1}} variant="dense">
            <IconButton color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: {sm: 'none'}
                        }}>
                <MenuIcon/>
            </IconButton>
            <Box sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center"
            }}
                 onClick={() => navigate("/")}>
                <Checklist sx={{
                    width: 38,
                    height: 38,
                    mr: 1
                }}/>
                <Typography variant="h4"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 500,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}>
                    ToDo Boards
                </Typography>
            </Box>

            <Box sx={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                right: 0
            }}>
                <Avatar sx={{
                    width: 40,
                    height: 40,
                    m: 1,
                }}>{"username"[0]}</Avatar>
                <Typography>username1</Typography>
                <IconButton size="small"
                            aria-describedby={id}
                            onClick={handlePopoverClick}
                            sx={{
                                color: "#626ed4",
                                "&:hover": {
                                    background: "#242a38"
                                }
                            }}>
                    {openPopover
                        ? <LessIcon/>
                        : <MoreIcon/>}
                </IconButton>
                <Popover id={id}
                         open={openPopover}
                         anchorEl={anchorEl}
                         onClose={handlePopoverClose}
                         anchorOrigin={{
                             vertical: 'bottom',
                             horizontal: 'center',
                         }}
                         transformOrigin={{
                             vertical: 'top',
                             horizontal: 'right',
                         }}
                         sx={{
                             '& .MuiPaper-root': {
                                 p: 1, background: "#2a3142",color: "#f3f3f3",
                             }
                         }}
                >

                    <Typography>dawdawdawdawd@gmail.com</Typography>
                    <Button variant="contained"
                            sx={{
                                background: "#626ed4",
                                color: "#f3f3f3",
                                "&:hover": {background: "#3e49b2"}
                            }}
                            size="small"
                            startIcon={<Logout/>}
                            onClick={logoutHandler}>
                        Logout</Button>
                </Popover>
            </Box>
        </Toolbar>
    </AppBar>
}
