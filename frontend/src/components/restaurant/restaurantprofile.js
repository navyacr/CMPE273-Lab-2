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
import RestaurantMenu from './menu';

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurantInfo();
  } 

  getRestaurantInfo = () => {
     
    const id = localStorage.getItem('restaurant_id')
    axios.get(`${backendServer}/restaurants/${id}/info`)
    .then(response => {
        this.setState({
            name: response.data.name,
            email: response.data.email,
            restaurantId: response.data.id
        });
    });

    axios.get(`${backendServer}/restaurants/${id}/profile`)
    .then(response => {
        this.setState({
            // console.log(response.data);
            description: response.data.description,
            contact: response.data.contact,
            timings: response.data.timings,
            location: response.data.location
            // restaurantId: response.data[0].id
        });
    });

  }
  render(name) {
    var imgsrc = `${backendServer}/restaurants/${this.state.restaurantId}/viewProfileImage`;

    return (
        <div>
            {/* {redirectVar} */}
                <div class="restaurantHome">
                    <h2 style={{color: "maroon"}}> <b>{ this.state.name } </b></h2>
                    <img class="profile-photo" src={imgsrc}></img>
                    {/* <div> <Link to='/restaurantprofileupdate'>Update Profile</Link></div> */}
                    <p> <b>Description:</b> {this.state.description}</p>
                    <p> <b>Reviews:</b> ***** </p>
                    <p> <b>Phone:</b> {this.state.contact} </p>
                    <p> <b>Email:</b> {this.state.email} </p>
                    <p> <b>Our Address:</b> {this.state.location}</p>
                    <p> <b>Timings:</b> {this.state.timings} </p>
                </div>
                <div>
                  <h4><b> Menu: </b></h4>
                </div>
                <div>
                  < RestaurantMenu />
                </div>
                
                
            </div>
    )
  }
}


export default RestaurantProfile;