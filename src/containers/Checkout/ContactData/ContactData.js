import React from "react"

import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"

class ContactData extends React.Component {
    state = {
        
                name: '',
                street: '',
                zipCode: '',
                country: '',
                email: '',
                deliveryMethod: 'Fastest'  
             
        ,
        loading: false
             }

    orderHandler = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
  
        const { name, street, zipCode, country, email, deliveryMethod} = this.state
        const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,

        orderForm: {
            name: name,
            street: street,
            zipCode: zipCode,
            country: country,
            email: email,
            deliveryMethod: deliveryMethod        
             }
      
    }

    

    axios.post('/orders.json', order)
    .then(resp => {
        // console.log("resp in order", resp);
        this.setState({ 
            loading: false
         })
         this.props.history.push("/")
    })
    .catch(err => {
        // console.log("err in order", err);
        this.setState({ 
            loading: false
        })
        
    })
        
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })

        // if (inputElement.target.name === "deliveryMethod") {
  
    
        //     console.log("E.TTARGET", inputElement.target.options.selectedIndex);
        //     return  inputElement.target.options.selectedIndex
            
        
        // }
    }


    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.state.loading ? <Spinner/> : 
                <form className={classes.Form}>
                    <input 
                    className={classes.Input}
                    type="text"
                    name="name"
                    placeholder="Your name"
                    onChange={this.handleChange}/>
                    <input 
                    className={classes.Input}
                    type="email" 
                    name="email" 
                    placeholder="Your email"
                    onChange={this.handleChange}/>
                    <input 
                    className={classes.Input} 
                    type="text" 
                    name="street" 
                    placeholder="Street"
                    onChange={this.handleChange}/>
                    <input 
                    className={classes.Input} 
                    type="number" 
                    name="zipCode" 
                    placeholder="Postal Code"
                    onChange={this.handleChange}/>
                    <input 
                    className={classes.Input} 
                    type="text" 
                    name="country" 
                    placeholder="Country"
                    onChange={this.handleChange}/>

                    <label className={classes.Label}>Select a delivery method:</label>
                    <select 
                    name="deliveryMethod" 
                    onChange={this.handleChange}>
                        <option name="Fastest">Fastest</option>
                        <option name="Cheapest">Cheapest</option>
                  
                    </select>
    
                    
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