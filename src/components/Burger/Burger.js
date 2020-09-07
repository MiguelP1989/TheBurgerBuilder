import React from "react"

import {withRouter} from "react-router-dom"

import classes from "./Burger.css"
import BurgerIngredients from "./BurguerIngredients/BurgerIngredients"


const Burger = (props) => {

    console.log("props in burger component", props);
    

    // transforming the object ingredients to an array
    let transformedIngredients = Object.keys(props.ingredients).map(ingKey => {
    // console.log("ingKey", ingKey);
         
    // creating a newArray with the number of ingredients
    // Array(2) -> creates an array with length of 2 
    // [...Array(props.ingredients[ingKey])] -> creates an array with 2 elements [ , ]
    return [...Array(props.ingredients[ingKey])].map((_, idx) => {    
        return <BurgerIngredients key={ingKey + idx} type={ingKey}/> 
    })  
    // using reduce to flat the array
     // calculating the ingredient sum dynamically
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, [])
    // console.log(transformedIngredients);
    if (transformedIngredients.length == 0) {
        transformedIngredients = <p>Please start to add ingredients!</p>
    }

   

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

export default withRouter(Burger)