import { Box, Link, Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Link as RouterLink,} from 'react-router-dom';
import React from 'react';
import {EditCalendar} from "@mui/icons-material";

export const HeaderBackground = () => {

    return <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundImage: "linear-gradient(112.1deg, #2b2c4f 11.4%, #354269 70.2%)",
        height: "130px",
    }}>
        <Box sx={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
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
            <Typography sx={{color: "#f3f3f3", m:2}}
                        variant="h4">Project 1</Typography>

        </Box>

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
};