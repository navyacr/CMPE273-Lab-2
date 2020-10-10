import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';

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
          let imgsrc = `${backendServer}/restaurants/${this.state.dishes[i].id}/dishImage`
          if (!this.state.dishes[i].qty) {
            this.state.dishes[i].qty = 0
          }
            data.push(<Card border='info' border-width='10px' style={{ width: '60%' , color: 'black' , }}>
                        <Card.Body> 
                        <div class="d-flex">
                            <div class="mx-auto pull-left">
                            <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
                            </div>
                            <div class="mx-auto pull-right">
                            <Card.Title><b>{this.state.dishes[i].name}</b></Card.Title>
                            <Card.Text><b> Category: </b> {this.state.dishes[i].category}</Card.Text>
                            <Card.Text><b> Ingredients: </b>  {this.state.dishes[i].ingredients}</Card.Text>
                            <Card.Text><b> Description: </b> {this.state.dishes[i].description}</Card.Text>
                            <Card.Text><b> Price: </b> {this.state.dishes[i].price} USD</Card.Text>
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
                        </div>
                        </div>
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