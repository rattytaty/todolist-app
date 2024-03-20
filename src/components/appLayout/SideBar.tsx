import React, {useState} from 'react';
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
    CalendarMonth as CalendarIcon,
    DashboardCustomize as BoardsIcon,
    Favorite as FavoriteIcon,
    Settings as SettingsIcon
} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material";

const drawerWidth = 240

type SideBarProps = {
    setDrawerIsClosing: (value: boolean) => void
    setIsDrawerOpen: (value: boolean) => void
    isDrawerOpen: boolean
}

type MenuItems = {
    route: string
    name: string,
    icon: React.ReactNode
}

const menuItems: MenuItems[] = [
    {
        route: "",
        name: "All boards",
        icon: <BoardsIcon />
    }, {
        route: "/calendar",
        name: "Calendar",
        icon: <CalendarIcon />
    }, {
        route: "/settings",
        name: "Settings",
        icon: <SettingsIcon/>
    }
]

export const SideBar = ({setDrawerIsClosing, setIsDrawerOpen, isDrawerOpen}: SideBarProps) => {

    const navigate = useNavigate()
    const [isFavoriteBlockOpen, setIsFavoriteBlockOpen] = useState(true);

    const toggleFavoriteBlock = () => {
        setIsFavoriteBlockOpen(!isFavoriteBlockOpen);
    };

    const handleDrawerClose = () => {
        setDrawerIsClosing(true);
        setIsDrawerOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setDrawerIsClosing(false);
    };

    const ListStyled = styled(List)({
        width: "100%",
        maxWidth: drawerWidth,
        "& .MuiListItemButton-root": {
            "&:hover": {
                background: "#242a38",
                color: "#f3f3f3",
                "& .MuiSvgIcon-root": {
                    color: "#f3f3f3"
                },
                "& .MuiListItemText-root": {
                    color: "#f3f3f3"
                },
            }
        },
        "& .MuiListItemText-root": {
            color: "#bfc1c7"
        },
        "& .MuiSvgIcon-root": {
            color: "#bfc1c7"
        },
        "& .MuiListSubheader-root": {
            background: "#2a3142",
            color: "#bfc1c7"
        },
    })

    const drawer = (
        <ListStyled subheader={<ListSubheader>Menu:</ListSubheader>}>
            {menuItems.map(item =>
                <ListItemButton onClick={() => navigate(item.route)}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name}/>
                </ListItemButton>
            )}
            <ListItemButton onClick={toggleFavoriteBlock}>
                <ListItemIcon>
                    <FavoriteIcon/>
                </ListItemIcon>
                <ListItemText primary="Favorite boards"/>
                {isFavoriteBlockOpen ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={isFavoriteBlockOpen}
                      timeout="auto"
                      unmountOnExit>
                <List component="div"
                      disablePadding>
                    <ListItemButton sx={{
                        pl: 4
                    }}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="Project 1"/>
                    </ListItemButton>
                    <ListItemButton sx={{
                        pl: 4
                    }}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <ListItemText primary="Project 2"/>
                    </ListItemButton>
                </List>
            </Collapse>
        </ListStyled>)

    return <nav>
        <Drawer variant="temporary"
                open={isDrawerOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true
                }}
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'none'
                    },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth
                    },
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
                    display: {
                        xs: 'none',
                        sm: 'block'
                    },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        border: "none",
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    },
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