import React from "react"

import axios from "../../axios-orders"

import Aux from "../../hoc/Aux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"

import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"

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
        purchasing: false,
        loading: false
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

        // console.log("suuuum", sum);
        

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
        this.updatePurchaseState(updatedIngredients)
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

    this.setState({ loading: true })
    // alert("you will continue..!!")
    // endpoint - any name.json
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
            name: "Miguel",
            address: {
                street: 'teste street',
                zipCode: '4321',
                country: 'Germany'
            },
            email: 'teste@hotmail.com'
        },
        deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
    .then(resp => {
        console.log("resp in order", resp);
        this.setState({ 
            loading: false,
            purchasing: false
         })
    })
    .catch(err => {
        console.log("err in order", err);
        this.setState({ 
            loading: false, 
            purchasing: false // to close the modal
        })
        
    })
        
    }


    render() {

        const disableInfo = {
            ...this.state.ingredients
        }
        for ( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
            // value of each key (return true or false) {salad: true, meat: false ...}
        }

    
        

        return (
            <Aux> 
                <Burger ingredients={this.state.ingredients}/>
                <Modal
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                {!this.state.loading ? 
                     <OrderSummary
                     ingredients={this.state.ingredients}
                     price={this.state.totalPrice}
                     modalClosed={this.purchaseCancelHandler}
                     continuePurchase={this.purchaseContinueHandler}/>
                    : <Spinner/>}
           
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

export default withErrorHandler(BurgerBuilder, axios)