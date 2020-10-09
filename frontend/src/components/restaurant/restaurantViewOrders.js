import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';
import "react-flexy-table/dist/index.css";
import Dropdown from 'react-dropdown';

const buttons = [
  { name: "All", value: "all" },
  { name: "New", value: "Order Received" },
  { name: "Delivered", value: "Delivered" },
  { name: "Picked Up", value: "Picked Up" },
  { name: "Cancelled", value: "Cancelled" }
];

class RestaurantViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getOrders();
  } 
  componentDidMount() {
    this.setState({
      all: this.state.orders
    });
  }

  handleClick = (name) => {
    console.log(name)
    let filteredData = [];
    if (name === "all"){
      this.setState({orders: this.state.allorders})
      return
    }
    filteredData = this.state.allorders.filter(
          orders => orders.status === name
    );  
    console.log("Filtered data: ", filteredData)
    this.setState({ orders: filteredData });
  };

  update = () => {
    const id = localStorage.getItem('restaurant_id')
    axios.post(`${backendServer}/restaurants/${id}/orders`, {orders: this.state.orders})
    .then(response => {
      console.log("RestaurantOrders:", response.data)
      alert ("Order status updated.");
      this.getOrders();
        
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
            orders: response.data,
            allorders: response.data,
        });
    });
  }

  render(name) {
      var data = []

      if (this.state && this.state.orders && this.state.orders.length > 0) {
        
        for (var i = 0; i < this.state.orders.length; i++) {
          let imgsrc = `${backendServer}/restaurants/${this.state.orders[i].dish.id}/dishImage`
          let options = []
          let dropdown =<div></div>
            if (this.state.orders[i].dm) {
              let method = this.state.orders[i].dm
              if (method === "Delivery") {
                
                options = [{label: "On the way", value: i}, {label: "Delivered", value: i}]
              }
              if (method === "Pickup") {
                
                options = [{label: "Pick up Ready", value: i}, {label: "Picked up", value: i}]
              }
              if ((this.state.orders[i].status !== "Cancelled") && (this.state.orders[i].dm !== "Dinein")) {
                dropdown=dropdown=<Dropdown options={options} label={this.state.orders[i].id} onChange={this.onSelect} placeholder="Delivery mode" />
              }
            }
          
            data.push(<Card border='info' border-width='10px' style={{ width: '50%' , color: 'black' , }}> <Card.Body> 
                          <Card.Title><b>Customer Name:</b></Card.Title>
                          <a style={{ cursor: 'pointer' }} href={"/oneEventAttendeeView/" + this.state.orders[i].customer.id}>
                          <Card.Title><b>{this.state.orders[i].customer.name}</b></Card.Title>
                          </a>
                          <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
                          <Card.Text><b>Dish name: {this.state.orders[i].dish.name}</b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dish.price}</b></Card.Text>
                          <Card.Text><b> Status: {this.state.orders[i].status} </b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dm} </b></Card.Text>
                          {dropdown}
                      </Card.Body> </Card>)
        }
    }


    return (
      <div>
        <div>
          {buttons.map(({ name, value }) => (
            <button
              class="btn btn-primary pad"
              key={name}
              value={value}
              onClick={this.handleClick.bind(this, value)}
            >
              {name}
            </button>
          ))}
        </div>
        {data}
        <button class="btn btn-primary" onClick={this.update}>Update</button>
      </div>
    )
  }
}


export default RestaurantViewOrders;