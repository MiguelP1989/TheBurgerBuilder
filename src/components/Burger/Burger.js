import React from "react"

import classes from "./Burger.css"
import BurgerIngredients from "./BurguerIngredients/BurgerIngredients"


const Burger = (props) => {

    // transforming the object ingredients to an array
    let transformedIngredients = Object.keys(props.ingredients).map(ingKey => {
        console.log("ingKey", ingKey);
        console.log("props.ingredients", props.ingredients[ingKey]); // gives the value (number of ingredients)
        console.log([...Array(props.ingredients[ingKey])]);
        
    // transform tgis string value in an array
    // creating a newArray with the number of ingredients
    // ..Array(2) -> creates an array with length of 2 
    // [...Array(props.ingredients[ingKey])] -> creates an array with 2 elements [ , ]
    return [...Array(props.ingredients[ingKey])].map((_, idx) => {
       
        return <BurgerIngredients key={ingKey + idx} type={ingKey}/>
        
    })
        
        
    }).reduce((arr, el) => {
        return arr.concat(el)
    })


    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
            {/* <BurgerIngredients type="cheese"/>
            <BurgerIngredients type="meat"/> */}
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>

        </div>
    ) 
       
}

export default Burger