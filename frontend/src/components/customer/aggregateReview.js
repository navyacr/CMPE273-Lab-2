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

class AggregateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getAggregateReview();
    // this.setRestaurantShow = this.setRestaurantShow.bind(this);
  } 

  getAggregateReview = () => {
     console.log("Res id in review:", this.props.resid)
    axios.get(`${backendServer}/customers/${this.props.resid}/aggreviews`)
    .then(response => {
      console.log(response.data[0])
        this.setState({
            aggreviews: response.data[0]
        });
    });
  }

  render(name) {
    // let data = <div>No reviews</div>
    let mean = 0
      if (this.state.aggreviews && Number(this.state.aggreviews.count)>0){
      mean = Number(this.state.aggreviews.total)/Number(this.state.aggreviews.count)
      }
      if (this.state.aggreviews){
      var data = <div>
                <StarRatings
                rating={mean}
                starRatedColor="red"
                starDimension="15px"
                starSpacing='2px'
                numberOfStars={5}
                changeRating=""
                name='rating' />  {this.state.aggreviews.count} review(s)
                </div>

    }

    return (
      <div>
        {data}
      </div>
   )
  }
}

export default AggregateReview;