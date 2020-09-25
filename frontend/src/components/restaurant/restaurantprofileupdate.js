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

class RestaurantProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    
  } 

  onChange = (e) => {
    this.setState({
        // [e.target.name]: e.target.value
        [e.target.name]: e.target.value
    })
  }

  onUpdate = (e) => {
    //prevent page from refresh
    e.preventDefault();

    let data = Object.assign({}, this.state);
    this.props.updateRestaurant(data);
    console.log("OnUpdate called", data);
  };

  render() {

    return (
        <div>
            <h2> Update Restaurant: </h2>
           <Form onSubmit={this.onUpdate} >
                <Form.Row>
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>description</Form.Label>
                        <Form.Control name="description"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.description}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control name="contact"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.contact}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="location">
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="location"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.location}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="timings">
                        <Form.Label>Timings</Form.Label>
                        <Form.Control name="timings"
                            type="text"
                            onChange={this.onChange}
                            value={this.state.timings}
                            />
                    </Form.Group>
                </Form.Row>
                <ButtonGroup aria-label="Third group">
                    <Button type="submit" variant="success">Update Details</Button>
                </ButtonGroup>
            </Form>
            <center><Button href="/restaurantProfile">Home</Button></center>
        </div>
    )
  }
}

RestaurantProfileUpdate.propTypes = {
    getRestaurant: PropTypes.func.isRequired,
    updateRestaurant: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.restaurantProfileUpdate.user
});

export default connect(mapStateToProps, { getRestaurant, updateRestaurant })(RestaurantProfileUpdate);