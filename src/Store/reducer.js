
const initialstate = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0,
}

const ingredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.6,
    bacon: 0.7
}


const reducer = (state = initialstate, action) => {

    if (action.type == "ADD_INGREDIENT") {
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

    if (action.type == "REMOVE_INGREDIENT") {
        return  {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            totalPrice: state.totalPrice - ingredientPrices[action.ingredientName]
        }

    }
    return state

}

export default reducer