import React from "react"


import Modal from "../../components/UI/Modal/Modal"
import Aux from "../Aux"


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state= {
            error: null
        }
        componentWillMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            axios.interceptors.response.use(resp => resp, errorMessage => {
                this.setState({error: errorMessage})
            })
        }

        errorConfirmedHandler= () => {
            this.setState({error : null})
        }
        render() {
            return (
                <Aux>
                <Modal 
                show={this.state.error}
                modalClosed={this.errorConfirmedHandler}>
                    Ops..Something went wrong!! <br></br>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
            
            <WrappedComponent {...this.props} />
            </Aux>
            )
        }
    }
}

export default withErrorHandler