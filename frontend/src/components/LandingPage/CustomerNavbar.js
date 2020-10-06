import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class CustomerNavbar extends Component {
    constructor(props){
        super(props);
    }
   
    render(){
        return(
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <Link class="nav-link" to="/customerHome">Home </Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/customerProfile">Profile</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/viewOrders">Orders</Link>
                </li>
            </ul>
        </div>
        )
    }
}

export default CustomerNavbar;