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

class RestaurantMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurantMenu();
  } 

  getRestaurantMenu = () => {
     
    const id = localStorage.getItem('restaurant_id')
    axios.get(`${backendServer}/restaurants/${id}/dishes`)
    .then(response => {
        this.setState({
            dishes: response.data
        });
    });


  }
  render(name) {
      var data = []

      if (this.state && this.state.dishes && this.state.dishes.length > 0) {
        for (var i = 0; i < this.state.dishes.length; i++) {
            data.push(<Card.Body> 
                          <Card.Title><b>{this.state.dishes[i].name}</b></Card.Title>
                          <Card.Text><b> Category: </b> {this.state.dishes[i].category}</Card.Text>
                          <Card.Text><b> Ingredients: </b>  {this.state.dishes[i].ingredients}</Card.Text>
                          <Card.Text><b> Description: </b> {this.state.dishes[i].description}</Card.Text>
                          <Card.Text><b> Price: </b> {this.state.dishes[i].price}</Card.Text>
                      </Card.Body>)
              // <td>{this.state.dishes[i].name}</td>
              //             <td>{this.state.dishes[i].ingredients}</td>
              //             <td>{this.state.dishes[i].description}</td>
              //             <td>{this.state.dishes[i].category}</td>
              //             <td>{this.state.dishes[i].price}</td>
              //           </tr>)
        }
    }


    return (
      <div>
        {data}
      </div>
       
    // <div><table ><th>Name</th><th>Ingredients</th><th>Description</th><th>Category</th><th>Price</th>{data}</table></div>
    )
  }
}


export default RestaurantMenu;