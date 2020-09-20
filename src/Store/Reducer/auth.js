import * as actionTypes from "../Actions/actionTypes"

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"

}


const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.AUTH_START) {
        return {
            ...state,
            loading: true,
            error: null
        }
    }

    if (action.type === actionTypes.AUTH_SUCCESS) {
      
        return {
            ...state,
            token: action.idToken,
            userId: action.userId,
            error: null,
            loading: false
            
        }
    }

    if (action.type === actionTypes.AUTH_FAIL){
        return {
            ...state,
            loading: false,
            error: action.error
        }
    }

    if (action.type === actionTypes.AUTH_LOGOUT) {
        return  {
            ...state,
            token: null,
            userID: null
        }
    }

    if (action.type === actionTypes.SET_AUTH_REDIRECT) {
        // console.log("action in set_auth_redirect", action);
        
        return {
            ...state,
            authRedirectPath: action.path
        }
    }
    
    
    return state

   
    
}

export default reducer