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
import AggregateReview from './aggregateReview';
import CustomerSearch from './searchTab';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0
    };
    this.getRestaurants();
    this.search = this.search.bind(this);
    this.setCount = this.setCount.bind(this);
  } 

  search = () => {
    var params = {
      "type": this.state.type,
       "value": this.state.value
    }
    console.log(params)
    axios.post(`${backendServer}/customers/restaurantsearch`, params)
    .then(response => {
        console.log("Response: ", response)
        this.setState({
            restaurants: response.data
        });
    });
}
_onValueSelect = (e) => {
    this.setState({
        value: e.value
    })
}
_onInputChange = (e) => {
  this.setState({
      value: e.target.value
  });
}
_onSelect = (e) => {
this.setState({
    disabled: false,
    type: e.value
});
 console.log("Priting e: ", e)
 if (e && e.value === 'deliverymode'){
    this.setState({  
        secondoptions: [
            {value: 'dinein', label: 'Dine In'},
            {value: 'curbside', label: 'Curbside'},
            {value: 'delivery', label: 'Yelp Delivery'},
          ],

    });
    
 } else if (e && e.value === 'cuisine') {
    this.setState({

        secondoptions: [
            {value: 'Random', label: 'French'},
            {value: 'mexican', label: 'Mexican'},
            {value: 'mediterranean', label: 'Mediterranean'}
        ],
        
        
    });
} else if (e && (e.value === 'location' || e.value === 'dishname')) {
    this.setState({
      textbox: <input type="text" onChange={this._onInputChange}/>,
        
    });
    this.setState({
        disabled: true,
    });
  }
}
  getRestaurants = () => {
     
    axios.get(`${backendServer}/restaurants/info`)
    .then(response => {
        this.setState({
            restaurants: response.data
        });
    });
  }

  setCount = (count) => {
    this.setState({
      qty: count
    })
  }
  render(name) {
    const options = [
      {value: 'cuisine', label: 'Cuisine'},
      {value: 'deliverymode', label: 'Mode of Delivery'},
      {value: 'location', label: 'Location'},
      {value: 'dishname', label: 'Dish Name'}

    ]
    const defaultOption = options[2]

      var data = []

      if (this.state && this.state.restaurants && this.state.restaurants.length > 0) {
        for (let i = 0; i < this.state.restaurants.length; i++) {
          
            if (this.state.restaurants[i] && this.state.restaurants[i].restaurant) {
                // this.state.restaurants[i].qty = 0;
                if (!this.state.restaurants[i].qty) {
                  this.state.restaurants[i].qty = 0
                }
                data.push(
                            <Card border="basic" style={{ width: '18rem' }}><Card.Body> 
                              <a style={{ cursor: 'pointer' }} href={"/oneRestaurantView/" + this.state.restaurants[i].restaurant.id}>
                                <Card.Title><b>{this.state.restaurants[i].restaurant.name}</b></Card.Title>
                              </a>
                            <AggregateReview resid={this.state.restaurants[i].restaurant.id}/>
                            <Card.Text><b> Description: </b> {this.state.restaurants[i].description}</Card.Text>
                            <Card.Text> <div>
                                          <span>Quantity</span>
                                          <button onClick={() => {
                                            console.log("+", this.state.restaurants[i].qty)
                                            this.state.restaurants[i].qty += 1;
                                            }}>
                                              +
                                          </button>
                                          {/* {(this.state.restaurants[i].qty? this.state.restaurants[i].qty: this.state.restaurants[i].qty=0)} */}
                                          <input type="text" value={this.state.restaurants[i].qty} />
                                          <button
                                            onClick={() => {
                                              this.state.restaurants[i].qty > 0 ? this.state.restaurants[i].qty -= 1: this.state.restaurants[i].qty = 0;
                                            }}
                                            >
                                            -
                                          </button>
                                        </div></Card.Text>
                        </Card.Body></Card>)
            }
        }
    }


    return (
      <div>
        
        <CustomerLoginCheck />
        <table class="searchtable">
          <tr>
            <td>
            <Dropdown options={options} onChange={this._onSelect}  placeholder="Search by" />
            </td>
            <td>
              <div disabled={this.state.disabled}>
                <Dropdown options={this.state.secondoptions} onChange={this._onValueSelect} placeholder="Select" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {this.state.textbox}
            </td>
            <td>
            <button class="icon" onClick={this.search}><i class="glyphicon glyphicon-search"></i></button>
            </td>
          </tr>
        </table>
        {data}
      </div>
       
     )
  }
}


export default CustomerHome;