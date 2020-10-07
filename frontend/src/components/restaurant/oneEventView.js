import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import RestaurantLoginCheck from './restaurantLoginCheck';
import { Card, Row, Col } from 'react-bootstrap';


class OneEventView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getEventInfo();
  } 

  getEventInfo = () => {
     
    axios.get(`${backendServer}/events/${this.props.match.params.eventid}/attendees`)
    .then(response => {
        console.log("one event response", response)
        this.setState({
            customers: response.data
        });
    });

  }
  render(name) {
    var data = []

    if (this.state && this.state.customers && this.state.customers.length > 0) {
      for (let i = 0; i < this.state.customers.length; i++) {
        var imgsrc = `${backendServer}/customers/${this.state.customers[i].customer.id}/viewProfileImage`;
              data.push(
                          <Card border="basic" style={{ width: '18rem' }}><Card.Body> 
                            <img class="profile-photo" src={imgsrc}></img>
                            <a style={{ cursor: 'pointer' }} href={"/oneEventAttendeeView/" + this.state.customers[i].customer.id}>
                              <Card.Title><b>{this.state.customers[i].customer.name}</b></Card.Title>
                            </a>
                          </Card.Body></Card>)
          
      }
  }
    
    return (
        <div>
          <RestaurantLoginCheck/>
          <h2 style={{color: "maroon"}}> <b>Event Attendee List:</b></h2>
               {data}
            </div>
    )
  }
}


export default OneEventView;