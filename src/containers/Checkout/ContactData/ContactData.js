import React from "react"

import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler"

import {connect} from "react-redux"


import * as actionCreator from "../../../Store/Actions/index"
import { Redirect } from "react-router-dom"

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: 'Your Name'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: 'Street'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: "number",
                    placeholder: 'Zip Code'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: "text",
                    placeholder: 'Country'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: "email",
                    placeholder: 'Email'
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                valid: true,
                value: "Fastest"
            }
           
        
        },
            loading: false,
            formIsValid: false,
            errorMessage: [],
            // error: false
    
             }

        orderHandler = async e => {
        e.preventDefault()
        
        
        const formData = {} 
        for (let formElementIdent in this.state.orderForm) {
            formData[formElementIdent] = this.state.orderForm[formElementIdent].value
        }

       
        console.log("form data", formData);
        
        
        
        const order = {
        ingredients: this.props.ings,
        price: this.props.totalPrice,
        orderData: formData
       
        }

        this.props.onOrderBurger(order)
        this.props.history.push("/")
       
   

        
        
     
    
        // try {
        //     this.setState({ loading: true })
        //     const resp = await axios.post('/orders.json', order)
        //     // console.log("resp in order", resp);
        //     this.setState({ loading: false })
        //     this.props.history.push("/")
            
        // } catch (err) {
        //     console.log("err in order", err);
        //     this.setState({ loading: false })
        // }
    
    }

        checkValidaty = (value, rules) => {

        if (!rules) {
            return true
        }
        let isValid = true 

        if (rules.required) {
            isValid = value.trim() !== "" && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }


    handleChange = (event, inputidentifier) => {

       

        const updatedOrderForm = {
            ...this.state.orderForm
        }
       const updatedFromElement = { ...updatedOrderForm[inputidentifier] }

       updatedFromElement.value = event.target.value
       updatedFromElement.valid = this.checkValidaty(updatedFromElement.value, updatedFromElement.validation)
       updatedFromElement.touched = true
       updatedOrderForm[inputidentifier] = updatedFromElement

    

   
    let formIsValid = true
    for (let inputidentifier in updatedOrderForm) {
     formIsValid = updatedOrderForm[inputidentifier].valid && formIsValid
        
    }

    

    this.setState({
        orderForm : updatedOrderForm, 
        formIsValid: formIsValid
    })


    let errorMessage = ""
    if (!updatedFromElement.value) {
        errorMessage = "Field Required. "

        this.setState({
            errorMessage: errorMessage
        }) 
    } else {
        this.setState({
            errorMessage: "" 
        }) 

    }

    }



    render() {
      
      const formElementsArray = []

      for (let key in this.state.orderForm) {
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          })
      }



        return (

           
            
            <div className={classes.ContactData}>
                
                
                <h4>Enter your Contact Data</h4>
                {this.props.loading ? <Spinner/> : 
                <form 
                onSubmit={this.orderHandler}
                className={classes.Form}>
                    
                    {formElementsArray.map(formElement => (
         
                     <Input 
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    changed={(e) => this.handleChange(e, formElement.id)}/>

                      
                    ))}
                    
                    <p style={{color: "tomato"}}>{this.state.errorMessage}</p>
                    
                   

                    <label className={classes.Label}>Select a delivery method:</label>
                    <select 
                    name="deliveryMethod" 
                    onChange={(e) => this.handleChange(e)}>
                        <option value="Fastest">Fastest</option>
                        <option value="Cheapest">Cheapest</option>
                  
                    </select>
    
                    
                    <Button 
                    disable={!this.state.formIsValid}
                    btnType="Success">ORDER</Button>
                </form>
                }
            </div>
        )
    }
}



const mapStateToProps = state => {
    
    return  {
        ings: state.ingredientsReducer.ingredients,
        totalPrice: state.ingredientsReducer.totalPrice,
        loading: state.orderReducer.loading,

      

    }
}

const mapDispatchToProps = dispatch => {
    return  {
        onOrderBurger: (orderData) => dispatch(actionCreator.purchaseBurgerStart(orderData)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))