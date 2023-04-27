import Grid from "@mui/material/Grid"
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../Redux/Store";
import {logInTC} from "../../Redux/auth-reducer";
import {Navigate} from "react-router-dom";

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

    if (isLoggedIn) {
        return <Navigate to={"/"}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in register
                        <a href={'https://social-network.samuraijs.com/'} target={"_blank"}> here
                        </a>
                    </p>
                </FormLabel>
                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField label={"Email"}
                                   margin={"normal"}
                                   {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField label={"Password"}
                                   type={"password"}
                                   margin={"normal"}
                                   {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={"Remember me"} control={<Checkbox
                            {...formik.getFieldProps("rememberMe")}
                        />}/>

                        <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
                    </FormGroup>
                </form>
            </FormControl>

        </Grid>

    </Grid>
}