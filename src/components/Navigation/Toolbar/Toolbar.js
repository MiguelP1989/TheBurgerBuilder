import React from "react"

import classes from "./Toolbar.css"
import Logo from "../../../components/Logo/Logo"
import NavigationItems from "../../../components/Navigation/NavigationItems/NavigationItems"


const toolbar = () => {
    return  (
    <header className={classes.ToolBar}>
        <div>Menu</div>
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