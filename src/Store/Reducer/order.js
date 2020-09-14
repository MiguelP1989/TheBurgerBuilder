import * as actionTypes from "../Actions/actionTypes"

const initialState = {
    orders: [],
    loading: false
}


const reducer = (state = initialState, action) => {

    if (action.type == actionTypes.PURCHASE_BURGER_SUCCESS) {
        const newOrder = {
            ...action.orderData,
            id: action.orderId
        }
        
        const updatedOrder = state.orders.concat(newOrder)
        return {
            ...state,
            loading: false,
            orders: updatedOrder
        }
    }

    if (action.type == actionTypes.PURCHASE_BURGER_FAIL) {
        return {
            ...state,
            loading: false
        }
    }

    if (action.type == actionTypes.PURCHASE_BURGER_START) {
        return {
            ...state,
            loading: true
        }
    }

    return state
}

export default reducer