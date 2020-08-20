import React from "react"
import Aux from "../../hoc/Aux"

import Burger from "../../components/Burger/Burger"


class BurgerBuilder extends React.Component {
    state = {
        ingredients: {
            salad: 2,
            bacon: 2,
            cheese: 1,
            meat: 1
        }
    }

    render() {

        return (
            <Aux> 
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controler</div>
            </Aux>
        )

    }
}

export default BurgerBuilder