import {instance} from "./boards-api";
import {ResponseType} from "./tasks-api";
export type loginData = {
    email:string
    password:string
    rememberMe?:boolean
    captcha?:string
}

export type meResponse = {
    id:number
    email:string
    login:string
}

export const authApi = {
    login(data:loginData){
        return instance.post<ResponseType<{userId:number}>>(`auth/login`, data)
    },
    me(){
        return instance.get<ResponseType<meResponse>>(`auth/me`)
    },
    logout(){
        return instance.delete<ResponseType>(`auth/login`)
    }
}