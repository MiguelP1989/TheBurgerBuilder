import React from "react"
import { NavLink } from "react-router-dom"

import classes from "./NavigationItems.css"

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <li className={classes.NavigationItem}>
                <NavLink
                onClick={props.clicked}
                activeClassName={classes.active}
                exact
                to="/"
                >Burger Builder</NavLink>
            </li>
            <li className={classes.NavigationItem}>
                <NavLink 
                onClick={props.clicked}   
                activeClassName={classes.active}
                to="/orders"
                >Orders</NavLink>
            </li>
            <li className={classes.NavigationItem}>
                <NavLink 
                onClick={props.clicked}   
                activeClassName={classes.active}
                to="/auth"
                >Login</NavLink>
            </li>
        </ul>
    )
}

export default navigationItems