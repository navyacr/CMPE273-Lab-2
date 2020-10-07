import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css";
import Dropdown from 'react-dropdown';


class RestaurantViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getOrders();
  } 
  update = () => {
    const id = localStorage.getItem('restaurant_id')
    axios.post(`${backendServer}/restaurants/${id}/orders`, {orders: this.state.orders})
    .then(response => {
      console.log("RestaurantOrders:", response.data)
        
    });


  }
  onSelect = (e) => {
    console.log("Changed", e.value)
    console.log(e.label)
    this.state.orders[e.value].status = e.label
    console.log(this.state.orders)
  }
  getOrders = () => {
     
    const id = localStorage.getItem('restaurant_id')
    axios.get(`${backendServer}/restaurants/${id}/orders`)
    .then(response => {
      console.log("RestaurantOrders:", response.data)
        this.setState({
            orders: response.data
        });
    });
  }

  render(name) {
      var data = []

      if (this.state && this.state.orders && this.state.orders.length > 0) {
        let options = []
        for (var i = 0; i < this.state.orders.length; i++) {
          if (this.state.orders[i].dm) {
            let method = this.state.orders[i].dm
            if (method === "dinein") {
              options = [{label: "On the way", value: i}, {label: "Delivered", value: i}]
            } 
          }
          //let imgsrc = `${backendServer}/restaurants/${this.state.dishes[i].id}/dishImage`
            data.push(<Card border='info' border-width='10px' style={{ width: '50%' , color: 'black' , }}> <Card.Body> 
                          <Card.Title><b>{this.state.orders[i].customer.name}</b></Card.Title>
                          {/* <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img> */}
                          <Card.Text><b>{this.state.orders[i].dish.name}</b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dish.price}</b></Card.Text>
                          <Card.Text><b> Status: {this.state.orders[i].status} </b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dm} </b></Card.Text>
                          <Dropdown options={options} label={this.state.orders[i].id} onChange={this.onSelect} placeholder="Delivery mode" />
                      </Card.Body> </Card>)
        }
    }


    return (
      <div>
        {data}
        <button onClick={this.update}>Update</button>
      </div>
    )
  }
}


export default RestaurantViewOrders;