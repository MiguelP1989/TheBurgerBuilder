import React from "react"

import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"

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
            deliveryMethod: ''
        },
            loading: false
    
             }

    orderHandler = async e => {
        e.preventDefault()
        
        //acessing the values
        const formData = {} 
        for (let formElementIdent in this.state.orderForm) {
            formData[formElementIdent] = this.state.orderForm[formElementIdent].value
        }

        console.log("formData", formData);
        
        const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData
       
        }

      

        try {
            this.setState({ loading: true })
            const resp = await axios.post('/orders.json', order)
            // console.log("resp in order", resp);
            this.setState({ loading: false })
            this.props.history.push("/")
            
        } catch (err) {
            console.log("err in order", err);
            this.setState({ loading: false })
        }
    
    }

    checkValidaty = (value, rules) => {
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
        // console.log(event.target.value);
        // console.log('inputidentifier', inputidentifier);
        const updatedOrderForm = {
            ...this.state.orderForm
        }
       const updatedFromElement = { ...updatedOrderForm[inputidentifier] }

       updatedFromElement.value = event.target.value
       updatedFromElement.valid = this.checkValidaty(updatedFromElement.value, updatedFromElement.validation)
       updatedFromElement.touched = true
       console.log("updatedFromElement", updatedFromElement);
       
       updatedOrderForm[inputidentifier] = updatedFromElement
    //    console.log("updatedFromElement", updatedOrderForm);
       
        
        this.setState({
            orderForm : updatedOrderForm
        })
       
        

    }



    render() {
      
      const formElementsArray = []

      for (let key in this.state.orderForm) {
        //   console.log("key", key);
          formElementsArray.push({
              id: key,
              config: this.state.orderForm[key]
          })
      }


        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {this.state.loading ? <Spinner/> : 
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
              

                    <label className={classes.Label}>Select a delivery method:</label>
                    <select 
                    name="deliveryMethod" 
                    onChange={this.handleChange}>
                        <option name="Fastest">Fastest</option>
                        <option name="Cheapest">Cheapest</option>
                  
                    </select>
    
                    
                    <Button 
                    btnType="Success">ORDER</Button>
                </form>
                }
            </div>
        )
    }
}

export default ContactData