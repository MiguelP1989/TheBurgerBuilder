import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}


export const purchaseBurgerStart = (orderData) => {
    return async dispatch => {
            dispatch(purchaseBurguer())
        try {
            const resp = await axios.post('/orders.json', orderData)
            console.log('resp.data', resp.data.name) // id;
            
            dispatch(purchaseBurgerSuccess(resp.data.name, orderData))
           
            
        } catch (error) {
            console.log("err in order", error);
            dispatch(purchaseBurgerFail(error))
        }

    }
}


export const purchaseBurguer = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}