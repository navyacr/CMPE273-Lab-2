import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';

const buttons = [
  { name: "All", value: "all" },
  { name: "Preparing", value: "Preparing" },
  { name: "On the way", value: "On the way" },
  { name: "Delivered", value: "Delivered" },
  { name: "Pick up Ready", value: "Pick up Ready" },
  { name: "Picked up", value: "Picked up" },  
  { name: "Cancelled", value: "Cancelled" }
];

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getOrders();
    this.cancel = this.cancel.bind(this);
    this.handleClick = this.handleClick.bind(this);
  } 

  cancel = (e) =>{
    console.log("Cancelled: ", e.target.value) 
    axios.get(`${backendServer}/customers/${e.target.value}/cancelOrder`)
    .then( response => {
      console.log(response)
      if(response.status === 200){
          alert("You have cancelled the order.");        
          this.getOrders();  
      }else{
          alert('Oops!! something went wrong, Try again.');
      }
    })
}
componentDidMount() {
  this.setState({
    all: this.state.orders.updatedList
  });
}
handleClick = (name) => {
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

  getOrders = () => {
     
    const id = localStorage.getItem('customer_id')
    axios.get(`${backendServer}/customers/${id}/orders`)
    .then(response => {
      console.log(response.data)
        this.setState({
            allorders: response.data,
            orders: response.data
        });
    });
  }
  render(name) {
      var data = []

      if (this.state && this.state.orders && this.state.orders.length > 0) {
        for (var i = 0; i < this.state.orders.length; i++) {
          let imgsrc = `${backendServer}/restaurants/${this.state.orders[i].dish.id}/dishImage`
            data.push(<Card border='info' border-width='10px' style={{ width: '50%' , color: 'black' , }}> <Card.Body> 
                          <div class="d-flex">
                          <div class="mx-auto pull-left">
                          <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
                          </div>
                          <div class="mx-auto pull-right">
                          <Card.Title><b>{this.state.orders[i].dish.restaurant.name}</b></Card.Title>
                          <Card.Text><b>{this.state.orders[i].dish.name}</b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dish.price} USD</b></Card.Text>
                          <Card.Text><b> Quantity: {this.state.orders[i].qty}</b></Card.Text>
                          <Card.Text><b> Status: {this.state.orders[i].status} </b></Card.Text>                       
                          <Card.Text><b> Date: {this.state.orders[i].createdAt.split("T")[0]} </b></Card.Text>
                          <Card.Text><b> Time: {this.state.orders[i].createdAt.split("T")[1]} </b></Card.Text>
                          <button class="btn btn-primary" value={this.state.orders[i].id} onClick={this.cancel}>Cancel</button>
                          </div>
                          </div>
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
      </div>
    )
  }
}

export default ViewOrders;