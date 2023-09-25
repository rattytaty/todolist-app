import Grid from "@mui/material/Grid"
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import {Navigate, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../Store/Store";
import {logInTC} from "../../../Store/Reducers/auth-reducer";
import React, {useEffect} from "react";
import {initializeAppTC} from "../../../Store/Reducers/app-reducer";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email"
            }
            if (!values.password) {
                errors.password = "Required"
            } else if (values.password.length < 5) {
                errors.password = "Short password"
            }
        },
        onSubmit: values => {
            dispatch(logInTC(values))
        },
    })

    const isInitialized = useAppSelector((state) => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <CircularProgress/>
    }

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }

    return <Grid container justifyContent={"flex-end"}>
        <Grid container
              justifyContent="center"
              alignItems="center">
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p> To log in sign up <NavLink to={'https://social-network.samuraijs.com/signUp'}
                                                       target={'_blank'}>here</NavLink>.</p>
                        <p>Or use this account:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}