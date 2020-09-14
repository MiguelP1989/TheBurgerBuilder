import React from "react"

import CheckoutSummary from "../../components/Order/ChekoutSummary"
import { Route } from "react-router-dom"
import {connect} from "react-redux"

import ContactData from "./ContactData/ContactData"




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
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
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
        )
    }

}

const mapStateToProps = state => {
    console.log('state', state);
    
    return  {
        ings: state.ingredients,
        // totalPrice: state.totalprice
    }
}

export default connect(mapStateToProps)(Checkout)