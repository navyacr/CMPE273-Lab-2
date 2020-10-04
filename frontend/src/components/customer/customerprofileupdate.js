import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
// // import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurant, updateRestaurant } from '../../actions/restaurantProfileActions'
// import {restaurantsSignup} from '../../actions/signupActions'
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import backendServer from '../../config'

class CustomerProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : "",
        email: "",
        description : "",
        ingredients : "",
        price: ""
    }
    //Bind the handlers to this class
    this.nameChangeHandler = this.nameChangeHandler.bind(this);
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.ingredientsChangeHandler = this.ingredientsChangeHandler.bind(this);
    this.priceChangeHandler = this.priceChangeHandler.bind(this);

    this.submitUpdate = this.submitUpdate.bind(this);
    
  } 
 //username change handler to update state variable with the text entered by the user
 nameChangeHandler = (e) => {
    this.setState({
        name : e.target.value
    })
}
categoryChangeHandler = (e) =>{
    this.setState({
        category : e.target.value
    })
}

ingredientsChangeHandler = (e) =>{
    this.setState({
        ingredients : e.target.value
    })
}
//password change handler to update state variable with the text entered by the user
descriptionChangeHandler = (e) => {
    this.setState({
        description : e.target.value
    })
}
priceChangeHandler = (e) =>{
    this.setState({
        price : e.target.value
    })
}
//submit Login handler to send a request to the node backend
submitUpdate = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    const data = {
        name : this.state.name,
        category : this.state.category,
        description : this.state.description,
        ingredients: this.state.ingredients,
        price : this.state.price,
        restaurantId: localStorage.getItem("restaurant_id")
    }
    let dishname = this.state.name
    //set the with credentials to true
    // axios.defaults.withCredentials = true;
    //make a post request with the user data
    console.log(this.state.name)
    axios.post(`${backendServer}/restaurants/${this.state.name}/dishes`, data)
        .then(response => {
            console.log(response.data)
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    authFlag : true,
                    err: response.data                       
                })
            }else{
                this.setState({
                    authFlag : false
                })
            }
            
        });
}

  render() {

    return (
        <div>
            <h2> Update Restaurant Menu: </h2>
           <Form onSubmit={this.submitUpdate} >
                <Form.Row>
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Dish Name</Form.Label>
                        <Form.Control name="name"
                            type="text"
                            onChange={this.nameChangeHandler}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description"
                            type="text"
                            onChange={this.descriptionChangeHandler}
                             />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="ingredients">
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control name="ingredients"
                            type="text"
                            onChange={this.ingredientsChangeHandler}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control name="category"
                            type="text"
                            onChange={this.categoryChangeHandler}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price"
                            type="text"
                            onChange={this.priceChangeHandler}
                             />
                    </Form.Group>
                </Form.Row>
                <ButtonGroup aria-label="Third group">
                    <Button type="submit" variant="success">Update Menu</Button>
                </ButtonGroup>
            </Form>
            {/* <center><Button href="/restaurantProfile">Home</Button></center> */}
        </div>
    )
  }
}


export default CustomerProfileUpdate;