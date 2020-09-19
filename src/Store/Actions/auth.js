import * as actionTypes from "./actionTypes"
import axios from "axios"


import { key } from "../../key/key"



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        idToken: token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    // console.log('expirationTime', expirationTime);
    
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
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
            dispatch(authSuccess(resp.data.idToken, resp.data.localId))
            dispatch(checkAuthTimeout(resp.data.expiresIn))
        } catch (err) {
            // console.log(err.response.data.error.message);
            dispatch(authFail(err.response.data.error.message))
        }
        
       
    }
}