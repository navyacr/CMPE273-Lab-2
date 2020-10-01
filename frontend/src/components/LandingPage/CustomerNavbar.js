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
            <div>
                <ul class="nav navbar-nav">
                    <li class="active"><Link to="/customerHome">Home</Link></li>
                    <li><Link to="/customerProfile">Profile</Link></li>
                    {/* <li><Link to="/restaurantprofileupdate">Update Profile</Link></li> */}
                    {/* <li><Link to="/delete">Delete a Book</Link></li> */}
                </ul>   
        </div>
        )
    }
}

export default CustomerNavbar;