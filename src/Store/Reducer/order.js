import * as actionTypes from "../Actions/actionTypes"

const initialState = {
    orders: [],
    loading: false,
    error: false
    // purchased: false
}


const reducer = (state = initialState, action) => {

    // if (action.type == actionTypes.PURCHASE_INIT) {
    //     console.log("actionxxxx", action);
        
    //     return {
    //         ...state,
    //         purchased: false
    //     }
    // }

    if (action.type === actionTypes.PURCHASE_BURGER_SUCCESS) {
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }
        
        const updatedOrder = state.orders.concat(newOrder)
        return {
            ...state,
            loading: false,
            // purchased: true,
            orders: updatedOrder
        }
    }

    if (action.type === actionTypes.PURCHASE_BURGER_FAIL) {
        return {
            ...state,
            loading: false
        }
    }

    if (action.type === actionTypes.PURCHASE_BURGER_START) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type === actionTypes.FETCH_ORDERS_START) {
        return {
            ...state,
            loading: true
        }
    }

    if (action.type === actionTypes.FETCH_ORDERS_SUCCES) {
        return {
            ...state,
            orders: action.orders
        }
    }

    if (action.type === actionTypes.FETCH_ORDERS_FAIL){
        return {
            ...state,
            loading: false,
            error: true
        }
    }

  

    return state
}

export default reducer