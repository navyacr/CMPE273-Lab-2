import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurant, updateRestaurant } from '../../actions/restaurantProfileActions'
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import backendServer from '../../config';
import { postEvent } from '../../actions/eventActions';

class PostEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // name : "",
        // description : "",
        // date : "",
        // time: "",
        // location:"",
        // hashtags:""
    }
    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    this.submitEvent = this.submitEvent.bind(this);
    
  } 
 //username change handler to update state variable with the text entered by the user
   changeHandler = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}

submitEvent = (e) => {
    e.preventDefault();
    // let data = {
    //     name : this.state.name,
    //     time : this.state.time,
    //     description : this.state.description,
    //     date: this.state.date,
    //     location : this.state.location,
    //     hashtags: this.state.hashtags
    // }
    let data = Object.assign({}, this.state);
    this.props.postEvent(data);
    // axios.post(`${backendServer}/events/info`, data)
    //     .then(response => {
    //         console.log(response.data)
    //         console.log("Status Code : ",response.status);
    //         if(response.status === 200){
    //             alert("Event posted successfully")
    //             this.setState({
    //                 authFlag : true,
    //                 err: response.data                       
    //             })
    //         }else{
    //             alert("Some error occured. Try again..")
    //             this.setState({
    //                 authFlag : false
    //             })
    //         }
            
    //     });
}

  render() {

    return (
        <div>
            <h3 style={{color: "maroon"}}> <b>Enter the event details: </b></h3>
            <div class='form-adjust'>
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
        </div> 
    )
  }
}


// export default PostEvent;


PostEvent.propTypes = {
    postEvent: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.postEvent.user
});

export default connect(mapStateToProps, { postEvent})(PostEvent);