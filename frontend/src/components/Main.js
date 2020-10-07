import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login/Login';
// import CustomerPage from './Login/Login';
// import restaurantsPage from './Login/restaurantsPage'
import Navbar from './LandingPage/Navbar';
import customersSignup from './Signup/customersSignup';
import restaurantsSignup from './Signup/restaurantsSignup';
import restaurantProfile from './restaurant/restaurantprofile';
import customerProfile from './customer/customerprofile';
import restaurantProfileUpdate from './restaurant/restaurantprofileupdate';
import restaurantMenu from './restaurant/menu';
import menuUpdate from './restaurant/menuUpdate';
import customerHome from './customer/customerHome';
import OneRestaurantView from './customer/oneRestaurantView';
import EventView from './restaurant/eventView';
import PostEvent from './restaurant/postEvent'
import ViewOrders from './customer/viewOrders';
import CustomerProfileUpdate from './customer/customerprofileupdate';
import EventRegister from './customer/eventRegister'
import RestaurantViewOrders from './restaurant/restaurantViewOrders';

class Main extends Component {
  render() {
    return (
      <div>
        <customerLoginCheck />
        <Route path="/" component={Navbar} />
        <Route path="/login" component={Login} />
        {/* <Route path="/customerPage" component={CustomerPage} />
        <Route path="/restaurantsPage" component={restaurantsPage} /> */}
        <Route path="/customersSignup" component={customersSignup} />
        <Route path="/restaurantsSignup" component={restaurantsSignup} />
        <Route path="/restaurantProfile" component={restaurantProfile} />
        <Route path="/restaurantProfileUpdate" component={restaurantProfileUpdate} />
        <Route path="/restaurantMenu" component={restaurantMenu} />
        <Route path="/menuUpdate" component={menuUpdate} />
        <Route path="/customerProfile" component={customerProfile} />
        <Route path="/customerHome" component={customerHome} />
        <Route path="/oneRestaurantView/:resid" component={OneRestaurantView} />
        <Route path="/eventView" component={EventView} />
        <Route path="/postEvent" component={PostEvent} />
        <Route path="/viewOrders" component={ViewOrders} />
        <Route path="/profileUpdate" component={CustomerProfileUpdate} />
        <Route path="/eventRegister" component={EventRegister} />
        <Route path="/restaurantViewOrders" component={RestaurantViewOrders} />
      </div>
    );
  }
}
export default Main;
