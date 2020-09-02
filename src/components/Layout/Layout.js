import React from "react"

import Aux from "../../hoc/Aux"
import classes from "./Layout.css"

import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

 class Layout extends React.Component {
    state = {
        showSideDrawer: true
    }


    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }


     render() {
         return (
            <Aux>
            <Toolbar></Toolbar>
            <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler}/>
        <div>Toolbar, sideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </Aux>
         )
     }
 } 


export default Layout;