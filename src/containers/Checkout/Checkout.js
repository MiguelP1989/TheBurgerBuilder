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