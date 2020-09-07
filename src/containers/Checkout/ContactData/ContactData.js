import React from "react"

import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"

class ContactData extends React.Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        console.log("this.props.ingredients", this.props.ingredients);
        this.setState({ loading: true })
    // alert("you will continue..!!")
    // endpoint - any name.json
    const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
            name: "Miguel",
            address: {
                street: 'teste street',
                zipCode: '4321',
                country: 'Germany'
            },
            email: 'teste@hotmail.com'
        },
        deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
    .then(resp => {
        console.log("resp in order", resp);
        this.setState({ 
            loading: false
         })
         this.props.history.push("/")
    })
    .catch(err => {
        console.log("err in order", err);
        this.setState({ 
            loading: false
        })
        
    })
        
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.state.loading ? <Spinner/> : 
                <form className={classes.Form}>
                    <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="Your email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                    <Button 
                    btnType="Success"
                    clicked={this.orderHandler}>ORDER</Button>
                </form>
                }
            </div>
        )
    }
}

export default ContactData