import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import "react-flexy-table/dist/index.css";
import 'react-dropdown/style.css';

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getEvents();
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
                            <Card border="basic" style={{ width: '18rem' }}><Card.Body> 
                              <a style={{ cursor: 'pointer' }} href={"/oneEventView/" + this.state.events[i].id}>
                                <Card.Title><b>{this.state.events[i].name}</b></Card.Title>
                              </a>
                            <Card.Text><b> Description: </b> {this.state.events[i].description}</Card.Text>
                            <Card.Text><b> Date: </b> {this.state.events[i].date}</Card.Text>
                            <Card.Text><b> Time: </b> {this.state.events[i].time}</Card.Text>
                            <Card.Text><b> Location: </b> {this.state.events[i].location}</Card.Text>
                            <Card.Text><b> Trending Hashtags: </b> {this.state.events[i].hashtags}</Card.Text>
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


export default EventView;