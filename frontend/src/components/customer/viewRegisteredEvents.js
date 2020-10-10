import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';
// import "react-flexy-table/dist/index.css";
import 'react-dropdown/style.css';

class ViewRegisteredEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
    this.getEvents();
  } 

  getEvents = () => {
    const id = localStorage.getItem('customer_id');
    axios.get(`${backendServer}/events/${id}/eventList`)
    .then(response => {
        console.log("Response: ", response)
        this.setState({
            events: response.data
        });
    });
  }
 


  render(name) {
      var data = []

      if (this.state && this.state.events && this.state.events.length > 0) {
        for (let i = 0; i < this.state.events.length; i++) {
                data.push(
                            <Card border="info" style={{ width: '58rem' }}><Card.Body> 
                            <Card.Title><b>{this.state.events[i].event.name}</b></Card.Title>                                                      
                            <Card.Text><b> Description: </b> {this.state.events[i].event.description}</Card.Text>
                            <Card.Text><b> Date: </b> {this.state.events[i].event.date.split('T')[0]}</Card.Text>
                            <Card.Text><b> Time: </b> {this.state.events[i].event.time}</Card.Text>
                            <Card.Text><b> Location: </b> {this.state.events[i].event.location}</Card.Text>
                            <Card.Text><b> Trending Hashtags: </b> {this.state.events[i].event.hashtags}</Card.Text>
                            <Card.Text> </Card.Text>
                        </Card.Body></Card>)
        }
    }
    return (
      <div>
        {data}
      </div>
     )
  }
}
export default ViewRegisteredEvents;