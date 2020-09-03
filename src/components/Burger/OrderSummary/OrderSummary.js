import React from "react"

import Aux from "../../../hoc/Aux"
import Button from "../../UI/Button/Button"


class OrderSummary extends React.Component {

    //this could be a functional component, does not have to be a class
    componentDidUpdate = () => {
        console.log("ordersummary did update");
        
    }

    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingKey =>{
            return (
                <li key={ingKey}>
                    <span style={{textTransform: "capitalize"}}>{ingKey} : {this.props.ingredients[ingKey]}</span>
                </li>
            )
        })

     return (
            <Aux>
             <h3>Your order</h3>
              <p>A delicious burger with the following ingredients</p>
              <ul>
                 {ingredientSummary}
             </ul>
             <p><strong>Total Price: {this.props.price.toFixed(2)} £</strong></p>
             <Button
             btnType="Danger"
             clicked={this.props.modalClosed}>CANCEL</Button>
             <Button
             btnType="Success"
             clicked={this.props.continuePurchase}>CONTINUE</Button>
            </Aux>
        )
    }
} 

export default OrderSummary