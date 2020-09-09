import React from "react"

import classes from "./Input.css"

const input = (props) => {


    const inputClasses = [classes.Input]
    if (props.invalid && props.touched) {
          inputClasses.push(classes.Invalid)
    
}

    let inputElement = null

    if (props.elementType == "input") {
        inputElement = 
        <input 
        className={inputClasses.join(' ')}
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