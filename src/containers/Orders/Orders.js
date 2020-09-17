import React from "react"
import axios from "../../axios-orders"

import Order from "../../components/Order/Order"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"
import Spinner from "../../components/UI/Spinner/Spinner"
import {connect} from "react-redux"

import * as actions from "../../Store/Actions/index"

class Orders extends React.Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

componentDidMount = () => {
        this.props.onFetchOrder()
 
   
    // axios.get("/orders.json")
    // .then(resp => {
    // // console.log("resp in orders", resp.data);
    // const fetchOrders = []
    // for (let key in resp.data) { 
    //     fetchOrders.push({
    //         id: key,
    //         ...resp.data[key]
    //     }) 
    // }
    // this.setState({ loading: false, orders: fetchOrders
    // })
    // })
    // .catch(err => { this.setState({ loading: false })
    // })
    }

render() {
    return (
        <div>
            {this.props.error ? <p>Orders not available!</p> : 
             
            !this.props.loading ? <Spinner/> : 
                  this.props.orders.map(order => {
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

const mapStateToProps = (state) => {
    return  {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        error: state.orderReducer.error
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return  {
        onFetchOrder: () => dispatch(actions.fetchtOrders()),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))