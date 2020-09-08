import React from "react"

import classes from "./Order.css"

import Button from "../UI/Button/Button"

const order = (props) => {
    const ingredients = []

    //converting obj in an array
    for (let ingredientName in props.ingredients) {
        ingredients.push(
        {
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }
    
    const ingredientOutput = ingredients.map(ing => {
        if (ing.amount > 0) {
            return <span 
    style={{textTransform: 'capitalize',
            display: 'inline-block',
            margin: '1.5px',
            border: "1px solid gray",
            padding: "5px",
            marginTop: "5px"
            }}
    key={ing.name}> {ing.name} ({ing.amount})</span>
        }
   
    })

    return (
        
        <div className={classes.Order}>
            
            <p>Ingredients: <br></br>
                {ingredientOutput}</p>
            <p>Price: <strong>£ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
           
        </div>
    )

}

export default order