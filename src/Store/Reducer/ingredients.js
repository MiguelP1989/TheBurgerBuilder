import * as actionTypes from "../Actions/actionTypes"


const initialstate = {
    ingredients: {},
    totalPrice: 0,
    error: false
   
}

const ingredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.6,
    bacon: 0.7
}


const reducer = (state = initialstate, action) => {

    if (action.type === actionTypes.ADD_INGREDIENT) {
        console.log(action);
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            totalPrice: state.totalPrice + ingredientPrices[action.ingredientName]
        }
    }

    if (action.type === actionTypes.REMOVE_INGREDIENT) {
        return  {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - ingredientPrices[action.ingredientName]
        }

    }

    if (action.type === actionTypes.SET_INGREDIENTS) {
        console.log("Action", action);
        
        return {
            ...state,
            ingredients: { /// placing ingredients in order
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat
            },
            error: false,
            totalPrice: 0
        }
        
    }

    if (action.type === actionTypes.FETCH_INGREDIENTS_FAILED) {
        console.log("ACTION", action);
        return {
            ...state,
            error: true
        }
        
    }

    return state

}

export default reducer