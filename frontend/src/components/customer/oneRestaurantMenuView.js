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
import "react-flexy-table/dist/index.css"

class OneRestaurantMenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurantMenu();
  } 

  getRestaurantMenu = () => {
     console.log("Res id is", this.props)
    axios.get(`${backendServer}/restaurants/${this.props.resid}/dishes`)
    .then(response => {
        this.setState({
            dishes: response.data
        });
    });
  }
  placeOrder = () => {
    let customerId = localStorage.getItem("customer_id")
    console.log(this.state.dishes)
    axios.post(`${backendServer}/customers/${customerId}/orders`, {dishes: this.state.dishes, dm: this.props.dm})
    .then(response => {
      console.log(response)
      console.log(this.props.dm)
      alert("Order placed successfully", response)
    })
    .catch(err => {
      alert("Error occured. Try again", err)
    })
  }

  render(name) {
      var data = []

      if (this.state && this.state.dishes && this.state.dishes.length > 0) {
        for (let i = 0; i < this.state.dishes.length; i++) {
          if (!this.state.dishes[i].qty) {
            this.state.dishes[i].qty = 0
          }
            data.push(<Card>
                        <Card.Body> 
                            <Card.Title><b>{this.state.dishes[i].name}</b></Card.Title>
                            <Card.Text><b> Category: </b> {this.state.dishes[i].category}</Card.Text>
                            <Card.Text><b> Ingredients: </b>  {this.state.dishes[i].ingredients}</Card.Text>
                            <Card.Text><b> Description: </b> {this.state.dishes[i].description}</Card.Text>
                            <Card.Text><b> Price: </b> {this.state.dishes[i].price}</Card.Text>
                            <Card.Text> <div>
                                          <span>Quantity</span>
                                          <button onClick={() => {
                                            console.log("+", this.state.dishes[i].qty)
                                         
                                            this.state.dishes[i].qty += 1;
                                            this.forceUpdate();
                                            }}>
                                              +
                                          </button>
                                          {(this.state.dishes[i].qty)}
                                          <button
                                            onClick={() => {
                                              this.state.dishes[i].qty > 0 ? this.state.dishes[i].qty -= 1: this.state.dishes[i].qty = 0;
                                              console.log("-", this.state.dishes[i].qty)
                                              this.forceUpdate();
                                            }}
                                            >
                                            -
                                          </button>
                                        </div>
                              </Card.Text>
                        
                        </Card.Body>
                      </Card>)
        }
    }

    return (
      <div>
        {data}
        <button class="btn btn-primary" onClick={this.placeOrder}> Place order</button>
      </div>   
    )
  }
}


export default OneRestaurantMenuView;