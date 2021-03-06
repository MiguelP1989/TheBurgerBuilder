import React from "react"

import CheckoutSummary from "../../components/Order/ChekoutSummary"
import { Route, Redirect } from "react-router-dom"
import {connect} from "react-redux"

import ContactData from "./ContactData/ContactData"



import * as actionCreator from "../../Store/Actions/index"


class Checkout extends React.Component {
    state = {
        // ingredients: null,
        // totalPrice: 0
    }

//     componentWillMount = () => {
//         const query = new URLSearchParams(this.props.location.search) 
//         const ingredients = {}
//         let price = 0
//         for (let param of query.entries()) {
//             console.log("param", param);
//             // ['salad, "1"]
//             if (param[0] === 'price') {
//                 price = param[1]
//             } else {
//             ingredients[param[0]] = +param[1]
//             }
//         }
//         this.setState({
//             ingredients: ingredients, totalPrice: price
//     })
// }
  

    checkoutCancelledHandendler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.onContinueCheckOut()
        this.props.history.replace('/checkout/contact-data')
    }

    render() {

       

        return (
            
            <div>
            
                
                {Object.keys(this.props.ings).length == 0 ? <Redirect to="/"/> :
                <div>
                         <CheckoutSummary 
                ingredients={this.props.ings}
                onCheckoutCancelled={this.checkoutCancelledHandendler}
                onCheckoutContinue={this.checkoutContinueHandler}/>

                {/* <Route 
                path={this.props.match.path + "/contact-data"}
                render={(props) => (
                <ContactData 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                {...props}/>
                )}/> */}

                <Route 
                path={this.props.match.path + "/contact-data"}
                component={ContactData}/>
                </div>
                }
           
            </div>
        )
    }

}

const mapStateToProps = state => {
    console.log('state in checkout', state);
    
    return  {
        ings: state.ingredientsReducer.ingredients,
        loading: state.orderReducer.loading
        // totalPrice: state.totalprice

        
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        onContinueCheckOut: () => dispatch(actionCreator.continueCheckout()),
        
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Checkout)