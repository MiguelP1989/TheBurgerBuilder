import React from "react"
import axios from "../../axios-orders"

import Order from "../../components/Order/Order"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true
    }

componentDidMount = () => {
    axios.get("/orders.json")
    .then(resp => {
    // console.log("resp in orders", resp.data);
    const fetchOrders = []
    for (let key in resp.data) { 
        fetchOrders.push({
            id: key,
            ...resp.data[key]
        }) 
    }
    this.setState({ loading: false, orders: fetchOrders
    })
    })
    .catch(err => { this.setState({ loading: false })
    })
    }

render() {
    return (
        <div>
            {this.state.orders.map(order => {
                return (
                <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
                )
            })}
        </div>
    )
}
}

export default withErrorHandler(Orders, axios)