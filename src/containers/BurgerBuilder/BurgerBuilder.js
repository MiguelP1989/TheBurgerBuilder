import React from "react"
import Aux from "../../hoc/Aux"

import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"


class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    addIngredientHandler = (type) => {
        // console.log("clicking");
        const oldCount = this.state.ingredients[type]
        const updateCount = oldCount + 1

        console.log(updateCount);
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount
        // console.log("updatedIngredients", updatedIngredients);
        this.setState({
            ingredients: updatedIngredients
        })
        
    }

    removeIngredientHandler = (type) => {
        console.log("clicking");
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount

        this.setState({
            ingredients: updatedIngredients
        })
        
    }


    render() {

        return (
            <Aux> 
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientsAdded={this.addIngredientHandler}
                ingredientsRemoved={this.removeIngredientHandler}/>
            </Aux>
        )

    }
}

export default BurgerBuilder