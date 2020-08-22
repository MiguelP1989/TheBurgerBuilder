import React from "react"
import Aux from "../../hoc/Aux"

import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"


const ingredientPrices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 0.6,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        // console.log("ingredients", ingredients);
        const sum = Object.keys(ingredients)
        .map(ingKey =>{
            // console.log(ingKey);
            // console.log("ingredients[ingKey]", ingredients[ingKey]);
            return ingredients[ingKey] // returning the values of each key
        })
        .reduce((acc, el) => {
            return acc + el
        }, 0)

        this.setState({
            purchaseable: sum > 0
        })
        

    }

    addIngredientHandler = (type) => {
        // console.log("clicking");
        const oldCount = this.state.ingredients[type]
        const updateCount = oldCount + 1

        // console.log(updateCount);
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updateCount
        // console.log("updatedIngredients", updatedIngredients);
        const priceAddition = ingredientPrices[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        // console.log("priceAddition",priceAddition);
        // console.log("newPrice", newPrice);
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice

        })

        this.updatePurchaseState(updatedIngredients)
        
    }

    removeIngredientHandler = (type) => {
       
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount

        const priceAddition = ingredientPrices[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceAddition

        // console.log("newPrice", newPrice);
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
      alert("you will continue..!!")
    }


    render() {

        const disableInfo = {
            ...this.state.ingredients
        }
        for ( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
            // value of each key (return true or false) {salad: true, meat: false ...}
        }

        // console.log("disableInfo", disableInfo);
        

        return (
            <Aux> 
                <Burger ingredients={this.state.ingredients}/>
                <Modal
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                modalClosed={this.purchaseCancelHandler}
                continuePurchase={this.purchaseContinueHandler}/>
                </Modal>
                <BuildControls 
                ingredientsAdded={this.addIngredientHandler}
                ingredientsRemoved={this.removeIngredientHandler}
                price={this.state.totalPrice}
                disabled={disableInfo}
                purchaseable={this.state.purchaseable}
                ordered = {this.purchaseHandler}/>
            </Aux>
        )

    }
}

export default BurgerBuilder