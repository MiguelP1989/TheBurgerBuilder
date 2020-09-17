import React, { Component} from "react"

import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"

import classes from "./Auth.css"
import { connect } from "react-redux"
import * as actions from "../../Store/Actions/index"

class Auth extends Component {

state = {
    controls: {
        email: {
            elementType: 'input',
            elementConfig: {
                type: "email",
                placeholder: 'Mail Adress'
            },
            value: "",
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: "password",
                placeholder: 'Password'
            },
            value: "",
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
        
    },
    formIsValid: false,
    isSignup: true
}

checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    // if (rules.isNumeric) {
    //     const pattern = /^\d+$/;
    //     isValid = pattern.test(value) && isValid
    // }

    return isValid;
}

handleChange = (event, controlName) => {
 
    const updatedControl = {...this.state.controls}
    const updatedControlElement = { ...updatedControl[controlName] }

 
    updatedControlElement.value = event.target.value
    updatedControlElement.valid = this.checkValidity(updatedControlElement.value, updatedControlElement.validation)
    updatedControlElement.touched = true
    updatedControl[controlName] = updatedControlElement




let formIsValid = true
for (let controlName in updatedControl) {
 formIsValid = updatedControl[controlName].valid && formIsValid
    
}



this.setState({
    controls : updatedControl, 
    formIsValid: formIsValid
})
}



submitHandler = (e) => {

    let email = this.state.controls.email.value
    let password = this.state.controls.password.value

    e.preventDefault()
    this.props.onAuth(email, password, this.state.isSignup)
}

switchAuthModeHandler = () => {
    this.setState(prevState => {
        return {
            isSignup: !prevState.isSignup
        }
    })
}

render () {

    const formElementsArray = []

    for (let key in this.state.controls) {
        formElementsArray.push({
            id: key,
            config: this.state.controls[key]
        })
    }

    // console.log("formElementsArray", formElementsArray);
    
    const form = formElementsArray.map(formElement => {
        return (
            <Input 
            key={formElement.id}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            changed={(e) => this.handleChange(e, formElement.id)}
            />
        )

        
    })

    

    return (
        <div className={classes.Auth}>
            <form  onSubmit={this.submitHandler}>
                {form}
                <Button 
                // disable={!this.state.formIsValid}
                btnType="Success"
               >SUBMIT</Button>
            </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">
                {this.state.isSignup ? "SIGNIN" : 'SIGNUP'}
                </Button>
        </div>
    )
}

}


const mapDispatchToProps = dispatch => {

    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}


export default connect(null, mapDispatchToProps)(Auth)