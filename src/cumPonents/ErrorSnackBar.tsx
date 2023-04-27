import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../Redux/Store";
import {setErrorAC} from "../Redux/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export function ErrorSnackbar() {

    const appError = useAppSelector((state)=>state.app.error)
    const dispatch = useAppDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setErrorAC(null))
    };

    return (
        <Snackbar open={!!appError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {appError}
            </Alert>
        </Snackbar>
    );
}
