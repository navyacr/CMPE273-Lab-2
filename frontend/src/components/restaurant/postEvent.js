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

class PostEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name : "",
        description : "",
        date : "",
        time: "",
        location:"",
        hashtags:""
    }
    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    // this.descriptionChangeHandler = this.categoryChangeHandler.bind(this);
    // this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    // this.ingredientsChangeHandler = this.ingredientsChangeHandler.bind(this);
    // this.priceChangeHandler = this.priceChangeHandler.bind(this);

    this.submitEvent = this.submitEvent.bind(this);
    
  } 
 //username change handler to update state variable with the text entered by the user
   changeHandler = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
// categoryChangeHandler = (e) =>{
//     this.setState({
//         category : e.target.value
//     })
// }

// ingredientsChangeHandler = (e) =>{
//     this.setState({
//         ingredients : e.target.value
//     })
// }
// //password change handler to update state variable with the text entered by the user
// descriptionChangeHandler = (e) => {
//     this.setState({
//         description : e.target.value
//     })
// }
// priceChangeHandler = (e) =>{
//     this.setState({
//         price : e.target.value
//     })
// }
//submit Login handler to send a request to the node backend
submitEvent = (e) => {
    // var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();
    let data = {
        name : this.state.name,
        time : this.state.time,
        description : this.state.description,
        date: this.state.date,
        location : this.state.location,
        hashtags: this.state.hashtags
    }
    axios.post(`${backendServer}/events/info`, data)
        .then(response => {
            console.log(response.data)
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                alert("Event posted successfully")
                this.setState({
                    authFlag : true,
                    err: response.data                       
                })
            }else{
                alert("Some error occured. Try again..")
                this.setState({
                    authFlag : false
                })
            }
            
        });
}

  render() {

    return (
        <div>
            <h2> Enter the event details: </h2>
            <Form onSubmit={this.submitEvent} >
               <Form.Row>
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control name="name"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>
              
                <Form.Row>
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Event Description</Form.Label>
                        <Form.Control name="description"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control name="date"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} controlId="time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control name="time"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>
              
                <Form.Row>
                    <Form.Group as={Col} controlId="location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control name="location"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>
            
                <Form.Row>
                    <Form.Group as={Col} controlId="hashtags">
                        <Form.Label>Trending Hashtags</Form.Label>
                        <Form.Control name="hashtags"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>
                <ButtonGroup aria-label="Third group">
                    <Button type="submit" variant="success">Post Event</Button>
                </ButtonGroup>
            </Form> 
        </div> 
    )
  }
}


export default PostEvent;