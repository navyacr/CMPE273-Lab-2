import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
// import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class customersSignup extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            name : "",
            email: "",
            password : "",
            authFlag : false,
            err: ""
        }
        //Bind the handlers to this class
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
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
    nameChangeHandler = (e) => {
        this.setState({
            name : e.target.value
        })
    }
    emailChangeHandler = (e) =>{
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
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
            name : this.state.name,
            email : this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/customers/info',data)
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
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Customer Signup</h2>
                            <p>Please enter your details</p>
                            {/* <h4><font color='red'>{this.state}</font></h4> */}
                        </div>
                        <form onSubmit={this.submitLogin}>
                            <div class="form-group">
                                <input onChange = {this.nameChangeHandler} type="text" class="form-control" name="name" placeholder="name" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="email" class="form-control" name="email" placeholder="email" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            
                            <button type="submit" class="btn btn-primary">Signup</button>  
                        </form>               
                    </div>
                    
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default customersSignup;