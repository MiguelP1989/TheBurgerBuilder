import React from "react"
import PropTypes from "prop-types"

import classes from "./BurgerIngredients.css"

const BurgerIngredients = (props) =>  {
    
let ingredient = null

if (props.type === "bread-bottom") {
    ingredient = <div className={classes.BreadBottom}></div>;
} else if (props.type === "bread-top") {
    ingredient = (
        <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
        </div>
    )
} else if (props.type === "meat") {
    ingredient = <div className={classes.Meat}></div>
} else if (props.type === "cheese") {
    ingredient = <div className={classes.Cheese}></div>
} else if (props.type === "salad") {
    ingredient = <div className={classes.Salad}></div>
} else if (props.type === "bacon") {
    ingredient = <div className={classes.Bacon}></div>
}

return ingredient
}

    
BurgerIngredients.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredients