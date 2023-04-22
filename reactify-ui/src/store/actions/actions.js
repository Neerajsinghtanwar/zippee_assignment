import {USER_LOGIN} from '../constants'
import {default as ax} from "axios";

export const userLogin =(data)=>{
    return {
        type:USER_LOGIN,
        data:data
    }
}

export const axios = ax.create({
    baseURL:`http://127.0.0.1:5000`,
})