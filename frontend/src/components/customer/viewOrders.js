import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import "react-flexy-table/dist/index.css";

const buttons = [
  { name: "All", value: "All" },
  { name: "New", value: "Order Recieved" },
  { name: "Delivered", value: "delivered" },
  { name: "Cancelled", value: "cancelled" }
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
    all: this.state.orders
  });
}
handleClick = (name) => {
  let filterCoffee = [];
  if (name === "Cancelled") {
    filterCoffee = this.state.orders.filter(
      orders => orders.status === name
    );
  } else {
    filterCoffee = this.state.coffees.filter(
      coffee => coffee.origin === name
    );
  }

  this.setState({ filterCoffee });
};

  getOrders = () => {
     
    const id = localStorage.getItem('customer_id')
    axios.get(`${backendServer}/customers/${id}/orders`)
    .then(response => {
      console.log(response.data)
        this.setState({
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
                          <Card.Title><b>{this.state.orders[i].dish.restaurant.name}</b></Card.Title>
                          <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
                          <Card.Text><b>{this.state.orders[i].dish.name}</b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dish.price}</b></Card.Text>
                          <Card.Text><b> Status: {this.state.orders[i].status} </b></Card.Text>
                          <button value={this.state.orders[i].id} onClick={this.cancel}>Cancel</button>
                          
                      </Card.Body> </Card>)
        }
    }
    
    return (
      <div>
        <div>
        {buttons.map(({ name, value }) => (
          <button
            key={name}
            value={value}
            onClick={this.handleClick.bind(this, name)}
          >
            {name}
          </button>
        ))}
        {/* <p>Coffee: {renderAll}</p> */}
        {/* <h2>{this.state.filterCoffee.length}</h2> */}
      </div>
        {data}
      </div>
    )
  }
}

export default ViewOrders;