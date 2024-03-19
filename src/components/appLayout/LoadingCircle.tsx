import React from 'react';
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";
import {useAppSelector} from "../../Store/Store";

export const LoadingCircle = () => {
    const appLoadingStatus = useAppSelector((state) => state.app.loadingStatus)
    return <Box sx={{
        position: "absolute",
        bottom: 20,
        right: 40
    }}> {appLoadingStatus === "loading"
        ? <CircularProgress/>
        : null}
    </Box>
};