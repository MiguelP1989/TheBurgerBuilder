import React from "react"

import classes from "./Toolbar.css"
import Logo from "../../../components/Logo/Logo"

const toolbar = () => {
    return  (
    <header className={classes.ToolBar}>
        <div>Menu</div>
        <Logo/>
        <nav className={classes.DesktopOnly}>
            ...
        </nav>
    </header>
    )
}

export default toolbar 