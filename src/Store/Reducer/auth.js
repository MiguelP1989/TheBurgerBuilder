import * as actionTypes from "../Actions/actionTypes"

const initialState = {
    auth: [],
    loading: false

}


const reducer = (state = initialState, action) => {
    if (action.type === actionTypes.AUTH_START) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type === actionTypes.AUTH_SUCCESS) {

        console.log(action);
        
        return {
            ...state
        }
    }

    // if (action.type === actionTypes.AUTH_FAIL){
    //     return {
    //         ...state,
    //         loading: false,
    //         error: true
    //     }
    // }
    return state
}

export default reducer