import React from "react"

import classes from "./Input.css"

const input = (props) => {

    let inputElement = null

    if (props.elementType == "input") {
        inputElement = 
        <input 
        className={classes.Input} 
        {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>
    }



return (
    <div className={classes.InputElement}>
        {inputElement}
    </div>
    )
}
    


export default input