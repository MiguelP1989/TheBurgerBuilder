import React from "react"

import Aux from "../../../hoc/Aux"


const orderSummary = (props) => {

const ingredientSummary = Object.keys(props.ingredients)
.map(ingKey =>{
    return (
        <li key={ingKey}>
            <span>{ingKey} : {props.ingredients[ingKey]}</span>
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
    <button
    onClick={props.modalClosed}>CANCEL</button>
    <button>CONTINUE</button>
</Aux>
)

}

export default orderSummary