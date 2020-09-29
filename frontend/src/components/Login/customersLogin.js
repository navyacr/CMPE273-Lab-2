import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';

//Define a Login Component
class customersLogin extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            err: ""
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
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/customers/validate',data)
            .then(response => {
                console.log(response.data)
                console.log("Status Code : ",response.status);
                if(response.status === 200){
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
            redirectVar = <Redirect to= "/customerProfile"/>
        }
        return(
            <div>
                {redirectVar}
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
                                <br/>
                                
                                <div>
                                    <p>New customer?
                                    <Link to='/CustomersSignup'>   Signup here</Link>
                                    </p>
                                    </div><br />
                                </div>
                        </form>

                    </div>
                    
                </div>
            
            </div>
        )
    }
}
//export Login Component
export default customersLogin;