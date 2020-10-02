import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
// // import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import {restaurantsSignup} from '../../actions/signupActions'
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css";
import CustomerLoginCheck from './customerLoginCheck';
import AggregateReview from './aggregateReview'

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurants();
    // this.setRestaurantShow = this.setRestaurantShow.bind(this);
  } 

  getRestaurants = () => {
     
    // const id = localStorage.getItem('restaurant_id')
    axios.get(`${backendServer}/restaurants/info`)
    .then(response => {
        this.setState({
            restaurants: response.data
        });
    });
  }

  render(name) {
      var data = []

      if (this.state && this.state.restaurants && this.state.restaurants.length > 0) {
        for (let i = 0; i < this.state.restaurants.length; i++) {
            if (this.state.restaurants[i] && this.state.restaurants[i].restaurant) {
                data.push(<a style={{ cursor: 'pointer' }} href={"/oneRestaurantView/" + this.state.restaurants[i].restaurant.id}>
                            <Card border="primary" style={{ width: '18rem' }}><Card.Body> 
                            <Card.Title><b>{this.state.restaurants[i].restaurant.name}</b></Card.Title>
                            <AggregateReview resid={this.state.restaurants[i].restaurant.id}/>
                            <Card.Text><b> Description: </b> {this.state.restaurants[i].description}</Card.Text>
                            <Card.Link>Check</Card.Link>
                        </Card.Body></Card></a>)
            }
        }
    }


    return (
      <div>
        <CustomerLoginCheck />
        {data}
      </div>
       
     )
  }
}


export default CustomerHome;