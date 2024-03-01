import {Outlet} from "react-router-dom";
import React, {useCallback} from "react";
import {ErrorSnackbar} from "../ErrorSnackBar";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import {CssBaseline, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../Store/Store";
import {logOutTC} from "../../Store/Reducers/auth-reducer";
import AdbIcon from '@mui/icons-material/Adb';
import {CalendarMonth, Checklist, DashboardCustomize, Favorite, Home, Settings} from "@mui/icons-material";
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';


export const Layout = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const appLoadingStatus = useAppSelector((state) => state.app.loadingStatus)
    const logoutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [dispatch])
    const drawerWidth = 240
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };



    const drawer = (
        <List
            sx={{ width: '100%', maxWidth: drawerWidth}}
            subheader={
                <ListSubheader sx={{ background:"#2a3142", color: "#f3f3f3"}}>Menu:</ListSubheader>
            }
        >
            <ListItemButton>
                <ListItemIcon >
                    <Home sx={{color:"#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon >
                    <DashboardCustomize sx={{color:"#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="All boards" />
            </ListItemButton>

            <ListItemButton>
                <ListItemIcon >
                    <CalendarMonth sx={{color:"#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="Calendar" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon >
                    <Settings sx={{color:"#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItemButton>

            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Favorite sx={{color:"#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="Favorite boards" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Project 1" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Project 2" />
                    </ListItemButton><ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                        <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Project 3" />
                </ListItemButton>


                </List>
            </Collapse>



        </List>);

    return <Box sx={{height:"100vh", width:"100vw", display: 'flex'}}>
        <CssBaseline/>
        <AppBar component="nav" sx={{ background: "#36394c", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{mr: 2, display: {sm: 'none'}}}>
                    <MenuIcon/>
                </IconButton>


                <Checklist sx={{  mr: 1 }} />
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.2rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    ToDo Boards
                </Typography>

                <input placeholder="search"/>
                <div>user</div>
                <button onClick={logoutHandler}>logout</button>
            </Toolbar>
            {/*{appLoadingStatus === "loading"
                    ? <LinearProgress/>
                    : <div style={{height: "4px"}}></div>}*/}</AppBar>
        <nav>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}

            > <Toolbar/>
                <Box sx={{ overflow: 'auto',
                    backgroundColor: "#2a3142",
                    color: "#f3f3f3",
                    height:"100%"}}>
                    {drawer}
                </Box>
            </Drawer>
            <Drawer  variant="permanent"
                sx={{display: {xs: 'none', sm: 'block'},
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { border:"none", width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto',
                    backgroundColor: "#2a3142",
                    color: "#f3f3f3",
                    height:"100%"}}>
                    {drawer}
                </Box>
            </Drawer>
        </nav>
        <Box component="main" sx={{height:"100%", width:"100%", p: 3,
            background: "#252735",}}>
            <Toolbar/>
            <Outlet/>
            <ErrorSnackbar/>
        </Box>
    </Box>
}