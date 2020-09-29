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
// import RestaurantMenu from './menu'

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getCustomerInfo();
  } 

  getCustomerInfo = () => {
     
    const id = localStorage.getItem('customer_id')
    axios.get(`${backendServer}/customers/${id}/info`)
    .then(response => {
        this.setState({
            name: response.data.name,
            email: response.data.email,
            customerId: response.data.id
        });
    });

    axios.get(`${backendServer}/customers/${id}/profile`)
    .then(response => {
        this.setState({
            dob: response.data.dob,
            city: response.data.city,
            state: response.data.state,
            country: response.data.country,
            nickname: response.data.nickname,
            headline: response.data.headline,
            yelpsince: response.data.yelpsince,
            thingsilove: response.data.thingsilove,
            findmein: response.data.findmein,
            website: response.data.website,
            phonenumber: response.data.phonenumber
        });
    });

  }
  render(name) {

    return (
        <div>
          <div class="customerHome">
            <h2 style={{color: "maroon"}}> <b>Basic details</b></h2>
              <p> <b>Name:</b> {this.state.name}</p>
              <p> <b>Date of Birth:</b> {this.state.dob} </p>
              <p> <b>City:</b> {this.state.city} </p>
              <p> <b>State:</b> {this.state.state}</p>
              <p> <b>Country:</b> {this.state.country} </p>
              <p> <b>Nickname:</b> {this.state.nickname} </p>
              <p> <b>Headline:</b> {this.state.headline} </p>
            <h2 style={{color: "maroon"}}> <b>About</b></h2>
              <p> <b>Yelping Since:</b> {this.state.yelpsince} </p>
              <p> <b>Things I love:</b> {this.state.thingsilove} </p>
              <p> <b>Find me in:</b> {this.state.findmein} </p>
              <p> <b>Website:</b> {this.state.website} </p>
            <h2 style={{color: "maroon"}}> <b>Contact Information</b></h2>
              <p> <b>Phone Number:</b> {this.state.phonenumber} </p>                    
              <p> <b>Email:</b> {this.state.email} </p> 
          </div>
        </div>
    )
  }
}


export default CustomerProfile;