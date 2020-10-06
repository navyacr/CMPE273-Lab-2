import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css";


class ViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getOrders();
  } 

  getOrders = () => {
     
    const id = localStorage.getItem('customer_id')
    axios.get(`${backendServer}/customers/${id}/orders`)
    .then(response => {
        this.setState({
            orders: response.data
        });
    });


  }
  render(name) {
      var data = []

      if (this.state && this.state.orders && this.state.orders.length > 0) {
        for (var i = 0; i < this.state.orders.length; i++) {
          //let imgsrc = `${backendServer}/restaurants/${this.state.dishes[i].id}/dishImage`
            data.push(<Card border='info' border-width='10px' style={{ width: '50%' , color: 'black' , }}> <Card.Body> 
                          <Card.Title><b>{this.state.orders[i].dish.restaurant.name}</b></Card.Title>
                          {/* <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img> */}
                          <Card.Text><b>{this.state.orders[i].dish.name}</b></Card.Text>
                          <Card.Text><b> {this.state.orders[i].dish.price}</b></Card.Text>
                          <Card.Text><b> Status: {this.state.orders[i].status} </b></Card.Text>
                      </Card.Body> </Card>)
        }
    }


    return (
      <div>
        {data}
      </div>
    )
  }
}


export default ViewOrders;