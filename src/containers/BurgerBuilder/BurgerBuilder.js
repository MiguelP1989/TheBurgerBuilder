import React from "react"
import {connect} from "react-redux"

import axios from "../../axios-orders"

import Aux from "../../hoc/Aux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"

import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"

// const ingredientPrices = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 0.6,
//     bacon: 0.7
// }

class BurgerBuilder extends React.Component {
    state = {
        // ingredients: false,
        totalPrice: 0,
        // purchaseable: false,
        purchasing: false,
        loading: false,
       
    }


    componentDidMount = () => {
        // console.log("this.props in componentdidmount", this.props);
        
        // axios.get('/ingredients.json')
        // .then(resp => {
        //     // console.log("resp", resp);
        //     this.setState({
        //         ingredients: resp.data
        //     })
        // })
        // .catch(error => error)
        
        
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
        return sum > 0

        // console.log("suuuum", sum);
        

        // this.setState({
        //     purchaseable: sum > 0 
        // })
        

    }

    // addIngredientHandler = (type) => {
    //     // console.log("clicking");
    //     const oldCount = this.state.ingredients[type]
    //     const updateCount = oldCount + 1

    //     // console.log(updateCount);
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updateCount
    //     // console.log("updatedIngredients", updatedIngredients);
    //     const priceAddition = ingredientPrices[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     // console.log("priceAddition",priceAddition);
    //     // console.log("newPrice", newPrice);
        
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice

    //     })

    //     this.updatePurchaseState(updatedIngredients)
        
    // }

    // removeIngredientHandler = (type) => {
       
    //     const oldCount = this.state.ingredients[type]
    //     if (oldCount <= 0) {
    //         return
    //     }
    //     const updatedCount = oldCount - 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount

    //     const priceAddition = ingredientPrices[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceAddition

    //     // console.log("newPrice", newPrice);
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseState(updatedIngredients)
    // }

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
    // console.log("burger builder", this.props);

    // const queryParams = []

    // for (let i in this.state.ingredients) {
    // queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
    // }
    // // to be able to have the TotalPrice in the checkout page
    // queryParams.push('price=' + this.state.totalPrice)
    // // console.log("queryParams", queryParams);
    
    // const queryString = queryParams.join("&")
    // this.props.history.push({
    //     pathname: "/checkout",
    //     search: "?" + queryString
    
    // })

    this.props.history.push("/checkout")
    }


    render() {

        const disableInfo = {
            ...this.props.ings
        }
        for ( let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
            // value of each key (return true or false) {salad: true, meat: false ...}
        }

      

        return (
            <Aux> 
                <Modal
                show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandler}>
                {!this.state.loading ? 
                     <OrderSummary
                     ingredients={this.props.ings}
                     price={this.state.totalPrice}
                     modalClosed={this.purchaseCancelHandler}
                     continuePurchase={this.purchaseContinueHandler}/>
                    : <Spinner/>}
           
                </Modal>
                
                {!this.props.ings ? 
                <Spinner/> :
                  <Burger ingredients={this.props.ings}/>
                }
                 {!this.props.ings ? 
                 null :
                <BuildControls 
                  ingredientsAdded={this.props.onIngredientAdded}
                  ingredientsRemoved={this.props.onIngredientRemoved}
                  price={this.props.totalPrice}
                  disabled={disableInfo}
                  purchaseable={this.updatePurchaseState(this.props.ings)}
                  ordered = {this.purchaseHandler}/>
                }
              
            </Aux>
        )

    }
}

const mapStateToProps = state => {
    console.log(state);
    
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        onIngredientAdded: (ingName) => dispatch({type: "ADD_INGREDIENT", ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: "REMOVE_INGREDIENT", ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))