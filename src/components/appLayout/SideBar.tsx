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
    setIsClosing:(value:boolean)=>void
    setMobileOpen:(value:boolean)=>void
    mobileOpen:boolean
}
export const SideBar = (props:SideBarProps) => {


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
                <ListSubheader sx={{background: "#2a3142", color: "#f3f3f3"}}>Menu:</ListSubheader>
            }>
            <ListItemButton>
                <ListItemIcon>
                    <Home sx={{color: "#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <DashboardCustomize sx={{color: "#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="All boards"/>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <CalendarMonth sx={{color: "#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="Calendar"/>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <Settings sx={{color: "#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="Settings"/>
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Favorite sx={{color: "#6b7a94"}}/>
                </ListItemIcon>
                <ListItemText primary="Favorite boards"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open}
                      timeout="auto"
                      unmountOnExit>
                <List component="div"
                      disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="Project 1"/>
                    </ListItemButton>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="Project 2"/>
                    </ListItemButton>
                    <ListItemButton sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="Project 3"/>
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
            <Toolbar/>
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
            <Toolbar/>
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
