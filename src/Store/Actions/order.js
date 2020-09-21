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


export const purchaseBurgerStart = (token, orderData) => {
    return async dispatch => {
            
            dispatch(purchaseBurguer())
        try {
            const resp = await axios.post('/orders.json?auth=' + token, orderData)
            // console.log('resp.data', resp.data.name) // id;
            
            dispatch(purchaseBurgerSuccess(resp.data.name, orderData))
           
            
        } catch (error) {
            // console.log("err in order", error);
            dispatch(purchaseBurgerFail(error))
        }

    }
}


export const purchaseBurguer = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

// export const purchaseInit = () => {
//     return  {
//         type: actionTypes.PURCHASE_INIT
//     }
// }


///// ORDERS PAGE ///

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCES,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}



export const fetchtOrders =  (token, userId) => {
    // console.log("token", token);
    
    // or we could get the token if we use getState()
    return  async dispatch => {

        try {
            dispatch(fetchOrdersStart())
            const queryparams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
            const resp = await axios.get('/orders.json' + queryparams)
        //    console.log("respond in orders", resp);
           const fetchOrders = []
           for (let key in resp.data) { 
               fetchOrders.push({
                   id: key,
                   ...resp.data[key]
               }) 
           }
       
           dispatch(fetchOrdersSuccess(fetchOrders))
           
        } catch (err) {
            // console.log(err);
            dispatch(fetchOrdersFail(err))
            
        }
    }
}


export const continueCheckout = () => {

    return {
        type: actionTypes.CONTINUE_CHECKOUT,
        
    }
}