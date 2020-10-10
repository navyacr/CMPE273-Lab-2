import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import "react-flexy-table/dist/index.css";
import CustomerLoginCheck from './customerLoginCheck';
import StarRatings from 'react-star-ratings';


class CustomerViewReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getReviews();
  } 

  getReviews = () => {
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
                            <Card border="info" style={{ width: '40%' }}><Card.Body> 
                            <Card.Title><b>{this.state.reviews[i].customer.name}</b></Card.Title>
                            <Card.Text><StarRatings
                            rating={Number(this.state.reviews[i].rating)}
                            starRatedColor="orange"
                            starDimension="15px"
                            starSpacing='2px'
                            numberOfStars={5}
                            changeRating=""
                            name='rating' /></Card.Text>
                            <Card.Text><b> Date: </b> {this.state.reviews[i].createdAt.split('T')[0]}</Card.Text>
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