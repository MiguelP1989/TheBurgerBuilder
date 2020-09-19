import React, { Component }from 'react';
import {Route, Switch} from "react-router-dom"

import Layout from "../src/components/Layout/Layout"
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import Orders from "./containers/Orders/Orders"
import Logout from "./containers/Auth/Logout/Logout"
import Auth from "./containers/Auth/Auth"



class App  extends Component {
  render() {
    return (
      <div>
      <Layout>
        <Switch>
        <Route path="/" exact component={BurguerBuilder}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/checkout" component={Checkout}/>
        </Switch>

        {/* <BurguerBuilder/>
        <Checkout/> */}
      </Layout>
     </div>
    )

   
  }
   

}

export default App;
