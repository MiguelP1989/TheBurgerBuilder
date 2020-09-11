
const initialstate = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 0,
}



const reducer = (state = initialstate, action) => {

    if (action.type == "ADD_INGREDIENT") {
        console.log(action);
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            }
        }
    }

    if (action.type == "REMOVE_INGREDIENT") {
        return  {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
        }

    }
    return state

}

export default reducer