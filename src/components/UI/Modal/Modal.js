import React from "react"

import classes from "./Modal.css"
import Backdrop from "../Backdrop/Backdrop"
import Aux from "../../../hoc/Aux"


class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
    return  nextProps.show !== this.props.show || nextProps.children !== this.props
   
    }

    componentDidUpdate = () => {
        // console.log("MODAL WILL UPDATE");
        
    }


    render() {
        return (
            <Aux>
            <Backdrop 
            show={this.props.show}
            clicked={this.props.modalClosed}/>
        
            <div className={classes.Modal}
            style={{
                transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                opacity: this.props.show ? "1" : "0",
                zIndex: !this.props.show ? "-1" : "1"
        
            }}
            >
                {this.props.children}
            </div> 
            </Aux>
        )
    }
}
   


export default Modal