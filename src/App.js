import React, { Component }from 'react';
import {Route, Switch} from "react-router-dom"

import Layout from "../src/components/Layout/Layout"
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"




class App  extends Component {
  render() {
    return (
      <div>
      <Layout>
        <Switch>
        <Route path="/" exact component={BurguerBuilder}/>
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
