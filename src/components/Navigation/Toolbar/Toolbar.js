import React from "react"

import classes from "./Toolbar.css"
import Logo from "../../../components/Logo/Logo"
import NavigationItems from "../../../components/Navigation/NavigationItems/NavigationItems"


const toolbar = (props) => {
    return  (
    <header className={classes.ToolBar}>
        <div 
        onClick={props.open}
        style={{cursor: "pointer"}}>Menu</div>
        <div className={classes.Logo}>
        <Logo/>
        </div>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
    )
}

export default toolbar 