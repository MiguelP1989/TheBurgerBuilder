import React from "react"

import classes from "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl"
import {Redirect} from "react-router-dom"



const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
]


const buildControls = (props) => {

    let authRedirect = null

    if (!props.isAuth) {
        authRedirect = <Redirect to="/auth"/>

    }

    return (
        <div className={classes.BuildControls}>
            
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong> £</p>
       {controls.map(ctrl => {
          return  (  
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                added = {() => props.ingredientsAdded(ctrl.type)}
                removed = {() => props.ingredientsRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                />
          )})}
        
        {props.purchaseable ?
         <button 
         className={classes.OrderButton}
         onClick={props.ordered}
         >
            {props.isAuth ?  'ORDER NOW' : 'SIGN UP TO PURCHASE'}
         </button> :
         null
    }
      
   </div>
    )
}

export default buildControls