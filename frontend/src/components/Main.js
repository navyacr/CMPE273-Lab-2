import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
// import Home from './Home/Home';
// import Delete from './Delete/Delete';
// import Create from './Create/Create';
import Navbar from './LandingPage/Navbar';
import customersSignup from './Signup/customersSignup';
import restaurantsSignup from './Signup/restaurantsSignup';
import restaurantProfile from './restaurant/restaurantprofile';
import customerProfile from './customer/customerprofile';
import restaurantProfileUpdate from './restaurant/restaurantprofileupdate';
import restaurantMenu from './restaurant/menu';
import menuUpdate from './restaurant/menuUpdate'
// Create a Main Component

class Main extends Component {
  render() {
    return (
      <div>
        {/* Render Different Component based on Route */}
        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        <Route path="/customersSignup" component={customersSignup} />
        <Route path="/restaurantsSignup" component={restaurantsSignup} />
        <Route path="/restaurantProfile" component={restaurantProfile} />
        <Route path="/restaurantProfileUpdate" component={restaurantProfileUpdate} />
        <Route path="/restaurantMenu" component={restaurantMenu} />
        <Route path="/menuUpdate" component={menuUpdate} />
        <Route path="/customerProfile" component={customerProfile} />
        {/* <Route path="/restaurantsLogin" component={restaurantsLogin} /> */}
        {/* <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/> */}
      </div>
    );
  }
}
// Export The Main Component
export default Main;
