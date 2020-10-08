import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import "react-flexy-table/dist/index.css";

const buttons = [
  { name: "All", value: "all" },
  { name: "New", value: "Order Received" },
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
  // this.getOrders()
  console.log(name)
  let filterCoffee = [];
  if (name === "all"){
    this.setState({orders: this.state.allorders})
    return
  }
  filterCoffee = this.state.allorders.filter(
        orders => orders.status === name
  );
  // if (name === "Cancelled") {
  //   filterCoffee = this.state.orders.filter(
  //     orders => orders.status === name
  //   );
  // } else {
  //   filterCoffee = this.state.orders.filter(
  //     orders => orders.status === name
  //   );
  // }

  console.log("Filter coffee: ", filterCoffee)
  this.setState({ orders: filterCoffee });
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
                          <Card.Title><b>{this.state.orders[i].dish.restaurant.name}</b></Card.Title>
                          <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
                          <Card.Text><b>{this.state.orders[i].dish.name}</b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dish.price}</b></Card.Text>
                          <Card.Text><b> Status: {this.state.orders[i].status} </b></Card.Text>                       
                          <Card.Text><b> Date: {this.state.orders[i].createdAt.split("T")[0]} </b></Card.Text>
                          <button class="btn btn-primary" value={this.state.orders[i].id} onClick={this.cancel}>Cancel</button>
                          
                      </Card.Body> </Card>)
        }
    }
    
    return (
      <div>
        <div>
        {buttons.map(({ name, value }) => (
          <button
            class="btn btn-primary"
            key={name}
            value={value}
            onClick={this.handleClick.bind(this, value)}
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