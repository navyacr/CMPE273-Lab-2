import React, { Component } from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {restaurantsLogin} from '../../actions/loginActions';

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
    
        console.log("data:", data)
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
        console.log(this.props)
        if (this.props.user && this.props.user.message === "SUCCESS" && this.state.signupFlag) {
            localStorage.setItem('restaurant_id', this.props.user.id)
            localStorage.setItem('restaurant_name', this.props.user.name)
            localStorage.setItem('type', "restaurant")
            
            alert("Logged in successfully");
            redirectVar = <Redirect to="/restaurantProfile" />
        }
        else if (this.props.user.message === "INVALID_CREDENTIALS" && this.state.signupFlag){
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
    user: state.restaurantsLogin.user
});
//export Login Component
export default connect(mapStateToProps, { restaurantsLogin })(RestaurantsLogin);