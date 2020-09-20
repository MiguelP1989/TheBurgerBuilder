import React, { Component }from 'react';
import {Route, Switch, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import * as actions from "./Store/Actions/index"

import Layout from "../src/components/Layout/Layout"
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import Orders from "./containers/Orders/Orders"
import Logout from "./containers/Auth/Logout/Logout"
import Auth from "./containers/Auth/Auth"



class App  extends Component {

  componentDidMount = () => {
    this.props.onTryAutoSignup()
  }

  render() {
    // routes for unauthenticathed users
    let routes = (
      <Switch>
             <Route path="/auth" component={Auth}/>
             <Route path="/" exact component={BurguerBuilder}/>
             <Redirect to="/" />
      </Switch>

    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
        <Route path="/orders" component={Orders}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/checkout" component={Checkout}/>
        <Route path="/" exact component={BurguerBuilder}/>
        <Redirect to="/" />     
        </Switch>
      )

    }

    return (
      <div>
      <Layout>

        {routes}
       

        {/* <BurguerBuilder/>
        <Checkout/> */}
      </Layout>
     </div>
    )

   
  }
   
}
const mapStateToProps = state => {
  return  {
    isAuthenticated: state.authReducer.token !== null
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
