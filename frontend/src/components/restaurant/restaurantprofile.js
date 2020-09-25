import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
// // import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import backendServer from '../../config';
// import { Row, Col } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import {restaurantsSignup} from '../../actions/signupActions'

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurantInfo();
  } 

  getRestaurantInfo = () => {
     
    const id = localStorage.getItem('restaurant_id')
    const name = localStorage.getItem('restaurant_name')
    axios.get(`${backendServer}/restaurants/info/${name}`)
    .then(response => {
        this.setState({
            name: response.data[0].name,
            email: response.data[0].email,
            restaurantId: response.data[0].id,
            zipcode: response.data[0].location
        });
    });

    axios.get(`${backendServer}/restaurants/${id}/profile`)
    .then(response => {
        this.setState({
            // console.log(response.data);
            email: response.data.location,
            description: response.data.description,
            contact: response.data.contact,
            timings: response.data.timings,
            address: response.data.location
            // restaurantId: response.data[0].id
        });
    });

  }
  render(name) {

    return (
        <div>
            {/* {redirectVar} */}
                <div class="restaurantHome">
                    <h2> <b>{ this.state.name } </b></h2>
                    <div><Link to='/restaurantprofileupdate'>Update Profile</Link></div>
                    <p> {this.state.description}</p>
                    <p> Reviews: ***** </p>
                    <p> Contact: {this.state.contact} <br/> {this.state.email} </p>
                    <p> Timings: {this.state.timings} </p>
                </div>
            </div>
    )
  }
}


export default RestaurantProfile;