import {Dispatch} from "redux";

import {ResponseType} from "../../api/tasks-api";
import {setErrorAC, setLoadingStatusAC} from "../Reducers/app-reducer";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    console.log("error")
    if (data.messages.length) {
        dispatch(setErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setErrorAC({error:"Some error occurred"}))
    }
    dispatch(setLoadingStatusAC({loadingStatus:"failed"}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(setErrorAC({error:error.message ? error.message : 'Some error occurred'}))
    dispatch(setLoadingStatusAC({loadingStatus:"failed"}))
}
