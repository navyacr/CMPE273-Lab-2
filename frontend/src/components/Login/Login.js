import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import RestaurantsLogin from './restaurantsLogin';
import axios from 'axios';
import backendServer from '../../config'

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        super(props);
        //maintain the state required for this component
        this.state = {
            cust_username : "",
            cust_password : "",
            cust_authFlag : false,
            cust_err: ""
        }
        //Bind the handlers to this class
        this.cust_usernameChangeHandler = this.cust_usernameChangeHandler.bind(this);
        this.cust_passwordChangeHandler = this.cust_passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            err: ""
        })
    }
    //username change handler to update state variable with the text entered by the user
    cust_usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    cust_passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${backendServer}/customers/validate`,data)
            .then(response => {
                console.log(response.data)
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    localStorage.setItem('customer_id', response.data.id)
                    localStorage.setItem('customer_name', response.data.name)
                    localStorage.setItem('type', "customer")
                    this.setState({
                        authFlag : true,
                        err: response.data                       
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
                
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;    
        if(this.state.authFlag){
            redirectVar = <Redirect to= "/customerHome"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                <div class="customer-form">
                    <div class="main-div">
                        <div class="panel">
                        
                            <h2>Customer Login</h2>
                            <p>Please enter your username and password</p>
                            {/* <h4><font color='red'>{this.state.err}</font></h4> */}
                        </div>
                        <form onSubmit={this.submitLogin}>                        
                            <div class="form-group">
                                <input onChange = {this.cust_usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.cust_passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>                 
                            <div class="signup-section">
                                
                                <div>
                                    <p>Don't have an account?
                                    <Link to='/CustomersSignup'>   Signup here</Link>
                                    </p>
                                    </div>
                                </div>
                        </form>

                    </div>
                    
                </div>
                
                <div class="restaurant-form"> <RestaurantsLogin /></div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Login;