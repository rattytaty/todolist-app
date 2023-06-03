import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppDispatch, useAppSelector} from "../Store/Store";
import {setErrorAC} from "../Store/Reducers/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {

    const dispatch = useAppDispatch()
    const appError = useAppSelector((state)=>state.app.error)
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {if (reason === 'clickaway') {
            return
        }
        dispatch(setErrorAC({error:null}))
    }

    return (
        <Snackbar open={!!appError}
                  autoHideDuration={6000}
                  onClose={handleClose}>
            <Alert  onClose={handleClose}
                    severity="error">
                {appError}
            </Alert>
        </Snackbar>
    )}