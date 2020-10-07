import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';
import "react-flexy-table/dist/index.css";
import 'react-dropdown/style.css';

class EventRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
        
    };
    this.getEvents();

    this.register = this.register.bind(this);
  } 
  register = (e) =>{
      console.log("Register: ", e.target.value)
      const attendee_data = {
          eventId: e.target.value,
          customerId: localStorage.getItem('customer_id')          
      }
      console.log(attendee_data)
      axios.post(`${backendServer}/events/${attendee_data.eventId}/attendees`, attendee_data)
      .then( response => {
        if(response.status === 200){
            alert("You have been registered for the event.")
            
        }else{
            alert('Oops!! something went wrong, Try again.')
        }
      })

  }

  getEvents = () => {
    axios.get(`${backendServer}/events/info`)
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
                            <Card border="basic" style={{ width: '58rem' }}><Card.Body> 
                            <Card.Title><b>{this.state.events[i].name}</b></Card.Title>                                                      
                            <Card.Text><b> Description: </b> {this.state.events[i].description}</Card.Text>
                            <Card.Text><b> Date: </b> {this.state.events[i].date}</Card.Text>
                            <Card.Text><b> Time: </b> {this.state.events[i].time}</Card.Text>
                            <Card.Text><b> Location: </b> {this.state.events[i].location}</Card.Text>
                            <Card.Text><b> Trending Hashtags: </b> {this.state.events[i].hashtags}</Card.Text>
                            <button value={this.state.events[i].id} onClick={this.register}>Register</button>

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


export default EventRegister;