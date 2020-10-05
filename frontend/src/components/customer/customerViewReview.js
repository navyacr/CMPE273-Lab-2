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
import StarRatings from 'react-star-ratings';
// import 

class CustomerViewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getReviews();
    // this.setRestaurantShow = this.setRestaurantShow.bind(this);
  } 

  getReviews = () => {
    //  console.log("Res id in review:", this.props.resid)
    axios.get(`${backendServer}/customers/${this.props.resid}/reviews`)
    .then(response => {
      console.log(response.data)
        this.setState({
            reviews: response.data
        });
    });
  }

  render(name) {
      var data = []

      if (this.state && this.state.reviews && this.state.reviews.length > 0) {
        for (let i = 0; i < this.state.reviews.length; i++) {
                data.push(
                            <Card border="primary" style={{ width: '18rem' }}><Card.Body> 
                            <Card.Title><b>{this.state.reviews[i].customer.name}</b></Card.Title>
                            <Card.Text><StarRatings
                            rating={Number(this.state.reviews[i].rating)}
                            starRatedColor="orange"
                            starDimension="15px"
                            starSpacing='2px'
                            numberOfStars={5}
                            changeRating=""
                            name='rating' /></Card.Text>
                            <Card.Text><b> Description: </b> {this.state.reviews[i].description}</Card.Text>
                            </Card.Body></Card>)
        }
    }


    return (
      <div>
        <h4><b>Reviews:</b></h4>
        <CustomerLoginCheck />
        {data}
      </div>
    )
  }
}


export default CustomerViewReview;