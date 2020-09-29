import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import RestaurantNavbar from './RestaurantNavbar'
import CustomerNavbar from './CustomerNavbar'

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        localStorage.removeItem('restaurant_id')
        localStorage.removeItem('customer_id')
        localStorage.removeItem('type')
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(localStorage.getItem('type')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        var component = ""
        if(localStorage.getItem('type') == "restaurant"){
            component = <RestaurantNavbar />
        } else if (localStorage.getItem('type') == "customer") {
            component = <CustomerNavbar />
        }
        return(
            <div>
                
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand">Yelp</a>
                    </div>
                    {component}
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;