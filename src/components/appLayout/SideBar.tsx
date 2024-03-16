import React from 'react';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {CalendarMonth, DashboardCustomize, Favorite, Home, Settings} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

const drawerWidth = 240

type SideBarProps = {
    setIsClosing: (value: boolean) => void
    setMobileOpen: (value: boolean) => void
    mobileOpen: boolean
}

type MenuItems = {
    route: string
    name: string
}

export const SideBar = (props: SideBarProps) => {


    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const handleDrawerClose = () => {
        props.setIsClosing(true);
        props.setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        props.setIsClosing(false);
    };


    const drawer = (
        <List
            sx={{width: '100%', maxWidth: drawerWidth}}
            subheader={
                <ListSubheader sx={{
                    background: "#2a3142",
                    color: "#bfc1c7"
                }}>Menu:</ListSubheader>
            }>
            <ListItemButton sx={{
                "&:hover": {
                    background: "#242a38", color: "#f3f3f3",
                    '& .MuiSvgIcon-root': {
                        color: "#f3f3f3"
                    },
                    "& .MuiListItemText-root": {
                        color: "#f3f3f3"
                    },
                }
            }}>
                <ListItemIcon sx={{
                    "&:hover": {color: "#f3f3f3"},
                }}>
                    <Home sx={{color: "#bfc1c7"}}/>
                </ListItemIcon>
                <ListItemText sx={{
                    color: "#bfc1c7",
                }} primary="Home"/>
            </ListItemButton>
            <ListItemButton sx={{
                "&:hover": {
                    background: "#242a38", color: "#f3f3f3",
                    '& .MuiSvgIcon-root': {
                        color: "#f3f3f3"
                    },
                    "& .MuiListItemText-root": {
                        color: "#f3f3f3"
                    },
                }
            }}>
                <ListItemIcon>
                    <DashboardCustomize sx={{color: "#bfc1c7"}}/>
                </ListItemIcon>
                <ListItemText sx={{color: "#bfc1c7"}} primary="All boards"/>
            </ListItemButton>
            <ListItemButton sx={{
                "&:hover": {
                    background: "#242a38", color: "#f3f3f3",
                    '& .MuiSvgIcon-root': {
                        color: "#f3f3f3"
                    },
                    "& .MuiListItemText-root": {
                        color: "#f3f3f3"
                    },
                }
            }}>
                <ListItemIcon>
                    <CalendarMonth sx={{color: "#bfc1c7"}}/>
                </ListItemIcon>
                <ListItemText sx={{color: "#bfc1c7"}} primary="Calendar"/>
            </ListItemButton>
            <ListItemButton sx={{
                "&:hover": {
                    background: "#242a38", color: "#f3f3f3",
                    '& .MuiSvgIcon-root': {
                        color: "#f3f3f3"
                    },
                    "& .MuiListItemText-root": {
                        color: "#f3f3f3"
                    },
                }
            }}>
                <ListItemIcon>
                    <Settings sx={{color: "#bfc1c7"}}/>
                </ListItemIcon>
                <ListItemText sx={{color: "#bfc1c7"}} primary="Settings"/>
            </ListItemButton>
            <ListItemButton sx={{
                "&:hover": {
                    background: "#242a38", color: "#f3f3f3",
                    '& .MuiSvgIcon-root': {
                        color: "#f3f3f3"
                    },
                    "& .MuiListItemText-root": {
                        color: "#f3f3f3"
                    },
                }
            }} onClick={handleClick}>
                <ListItemIcon>
                    <Favorite sx={{color: "#bfc1c7"}}/>
                </ListItemIcon>
                <ListItemText sx={{color: "#bfc1c7"}} primary="Favorite boards"/>
                {open ? <ExpandLess sx={{color: "#bfc1c7"}}/> : <ExpandMore sx={{color: "#cfd3d9"}}/>}
            </ListItemButton>
            <Collapse in={open}
                      timeout="auto"
                      unmountOnExit>
                <List component="div"
                      disablePadding>
                    <ListItemButton sx={{pl: 4,
                        "&:hover": {
                            background: "#242a38", color: "#f3f3f3",
                            '& .MuiSvgIcon-root': {
                                color: "#f3f3f3"
                            },
                            "& .MuiListItemText-root": {
                                color: "#f3f3f3"
                            },
                        }
                    }}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText sx={{color: "#bfc1c7"}} primary="Project 1"/>
                    </ListItemButton>
                    <ListItemButton sx={{pl: 4,
                        "&:hover": {
                            background: "#242a38", color: "#f3f3f3",
                            '& .MuiSvgIcon-root': {
                                color: "#f3f3f3"
                            },
                            "& .MuiListItemText-root": {
                                color: "#f3f3f3"
                            },
                        }
                    }} >
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText sx={{color: "#bfc1c7"}} primary="Project 2"/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>);

    return <nav>
        <Drawer variant="temporary"
                open={props.mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                }}>
            <Toolbar variant="dense"/>
            <Box sx={{
                overflow: 'auto',
                backgroundColor: "#2a3142",
                color: "#f3f3f3",
                height: "100%"
            }}>
                {drawer}
            </Box>
        </Drawer>
        <Drawer variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'block'},
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {border: "none", width: drawerWidth, boxSizing: 'border-box'},
                }}>
            <Toolbar variant="dense"/>
            <Box sx={{
                overflow: 'auto',
                backgroundColor: "#2a3142",
                color: "#f3f3f3",
                height: "100%"
            }}>
                {drawer}
            </Box>
        </Drawer>
    </nav>
};
