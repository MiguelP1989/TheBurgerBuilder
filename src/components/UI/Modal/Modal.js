import React from "react"

import classes from "./Modal.css"

const modal = (props) => {
    return ( 
    props.show ?
    <div className={classes.Modal}
    onClick={props.modalClosed}>
        {props.children}
    </div> : null
    )
}

export default modal