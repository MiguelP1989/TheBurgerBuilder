import React, { Component }from 'react';

import Layout from "../src/components/Layout/Layout"
import BurguerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"




class App  extends Component {
  render() {
    return (
      <div>
      <Layout>
        <BurguerBuilder/>
        <Checkout/>
      </Layout>
     </div>
    )

   
  }
   

}

export default App;
