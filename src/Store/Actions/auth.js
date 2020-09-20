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
    localStorage.removeItem('EXPIRATION_DATE')
    localStorage.removeItem('TOKEN')
    localStorage.removeItem('USER_ID')
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
          
            const now = new Date() 
            const expirationDate = new Date(now.getTime() + resp.data.expiresIn * 1000)
            localStorage.setItem('TOKEN', resp.data.idToken)
            localStorage.setItem('USER_ID', resp.data.localId)
            localStorage.setItem("EXPIRATION_DATE", expirationDate)

            dispatch(authSuccess(resp.data.idToken, resp.data.localId))
            dispatch(checkAuthTimeout(resp.data.expiresIn))
          
        } catch (err) {
            // console.log(err.response.data.error.message);
            dispatch(authFail(err.response.data.error.message))
        }
        
       
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('TOKEN')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('EXPIRATION_DATE'))
            if (expirationDate < new Date()) {
                dispatch(logout())
            }
            const userId = localStorage.getItem('USER_ID')
            dispatch(authSuccess(token, userId))
            // passing the diference between the future date and the current date
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}