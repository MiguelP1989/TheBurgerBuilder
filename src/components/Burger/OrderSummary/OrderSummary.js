import React from "react"

import Aux from "../../../hoc/Aux"
import Button from "../../UI/Button/Button"


const orderSummary = (props) => {

const ingredientSummary = Object.keys(props.ingredients)
.map(ingKey =>{
    return (
        <li key={ingKey}>
            <span style={{textTransform: "capitalize"}}>{ingKey} : {props.ingredients[ingKey]}</span>
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
    <p><strong>Total Price: {props.price.toFixed(2)} £</strong></p>
    <Button
    btnType="Danger"
    clicked={props.modalClosed}>CANCEL</Button>
    <Button
    btnType="Success"
    clicked={props.continuePurchase}>CONTINUE</Button>
</Aux>
)

}

export default orderSummary