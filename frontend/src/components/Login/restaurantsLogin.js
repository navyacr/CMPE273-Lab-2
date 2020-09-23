import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {restaurantsLogin} from '../../actions/loginActions'
import customersLogin from './customersLogin';

//Define a Login Component
class RestaurantsLogin extends Component{
    constructor(props) {
        super(props);
        this.state = {};
      } 
      onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
      }
      onSubmit = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
    
        this.props.restaurantsLogin(data);
    
        this.setState({
            signupFlag: 1
        });
      }
      render() {
        //redirect based on successful signup
        let redirectVar = null;
        let message = "";
        console.log("Props user value")
        console.log(this.props.user.message)
        if (this.props.user.message === "SUCCESS" && this.state.signupFlag) {
            alert("Logged in successfully");
            redirectVar = <Redirect to="/Login" />
        }
        else if (this.props.user.message === "Validation error" && this.state.signupFlag){
            message = "Invalid username or password"
        }
        return (
            <div >
                {redirectVar}
                        <div >
                            <div class="main-div">
                                <div class="panel">
                                    <h2>Restaurant Login</h2>
                                    <p>Please enter your username and password</p>
                                </div>
                                <form onSubmit={this.onSubmit}>
                                    
                                    <div class="form-group">
                                        <input type="email" class="form-control" name="username" onChange={this.onChange} placeholder="Username"  title="email address" required />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" required />
                                    </div>
                                    <div style={{ color: "#ff0000" }}>{message}</div>
                                    <button type="submit" class="btn btn-primary">Login</button>
                                    <div>Don't have an account? <Link to='/restaurantsSignup'>   Signup here</Link></div>
                                </form>
                            </div>
                        
                    </div>
        </div>
        )
      }
}

RestaurantsLogin.propTypes = {
    restaurantsLogin: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.signup.user
});
//export Login Component
export default connect(mapStateToProps, { restaurantsLogin })(RestaurantsLogin);