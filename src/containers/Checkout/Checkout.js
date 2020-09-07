import React from "react"

import CheckoutSummary from "../../components/Order/ChekoutSummary"


class Checkout extends React.Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1

        }
    }

    componentDidMount = () => {
        const query = new URLSearchParams(this.props.location.search) 
        const ingredients = {}
        for (let param of query.entries()) {
            console.log("param", param);
            // ['salad, "1"]
            ingredients[param[0]] = +param[1]
        }
        this.setState({
            ingredients: ingredients
    })
}


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
                ingredients={this.state.ingredients}
                onCheckoutCancelled={this.checkoutCancelledHandendler}
                onCheckoutContinue={this.checkoutContinueHandler}/>
            </div>
        )
    }
}

export default Checkout