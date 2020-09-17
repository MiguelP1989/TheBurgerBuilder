import * as actionTypes from "./actionTypes"
import axios from "axios"

import { key } from "../../key/key"


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


export const  auth =  (email, password, isSignup) => {

    return async dispatch => {

        let data = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`
        if (!isSignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`
        }

        try {
            dispatch(authStart())
            const resp = await axios.post(url, data)  
            console.log(resp.data);
            
            dispatch(authSuccess(resp.data))
        } catch (err) {
            dispatch(authFail(err))
        }
        
       
    }
}