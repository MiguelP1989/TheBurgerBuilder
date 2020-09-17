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



export const fetchtOrders = () => {
    return async dispatch => {

        try {
            dispatch(fetchOrdersStart())
           const resp = await axios.get("/orders.json")
           const fetchOrders = []
           for (let key in resp.data) { 
               fetchOrders.push({
                   id: key,
                   ...resp.data[key]
               }) 
           }
           console.log("respond in orders", resp);
           dispatch(fetchOrdersSuccess(fetchOrders))
           
        } catch (err) {
            console.log(err);
            dispatch(fetchOrdersFail(err))
            
        }
    //  axios.get("/orders.json")
    // .then(resp => {
    // // console.log("resp in orders", resp.data);
    // const fetchOrders = []
    // for (let key in resp.data) { 
    //     fetchOrders.push({
    //         id: key,
    //         ...resp.data[key]
    //     }) 
    // }
    // this.setState({ loading: false, orders: fetchOrders
    // })
    // })
    // .catch(err => { this.setState({ loading: false })
    // })
    // }
}
}


// export const setIngredients = (ingredients) => {
//     return {
//         type: actionTypes.SET_INGREDIENTS,
//         ingredients: ingredients
//     }
// }

// export const fetchIngredientsFailed = () => {
//     return {
//         type: actionTypes.FETCH_INGREDIENTS_FAILED
//     }
// }

// export const initIngredients = () => {
//     return dispatch => {
//          axios.get('/ingredients.json')
//         .then(resp => {
//             // console.log("resp", resp);
//            dispatch(setIngredients(resp.data))
//         })
//         .catch(error => {
//             dispatch(fetchIngredientsFailed())
//         })

//     }
