import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import 'react-dropdown/style.css';
import CustomerLoginCheck from './customerLoginCheck';

class EventRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
        textbox: <input type="text" placeholder="Search by event name" onChange={this._onInputChange}/>,
    };
    this.getEvents();
    this.register = this.register.bind(this);
  } 
  _onInputChange = (e) => {
    this.setState({
        value: e.target.value
    });
  }
  search = () => {
    var params = {
       "value": this.state.value
    }
    console.log(params)
    axios.post(`${backendServer}/events/eventsearch`, params)
    .then(response => {
        console.log("Response: ", response)
        this.setState({
            events: response.data
        });
    });
}

  register = (e) =>{
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
            events: response.data.updatedList
        });
    });
  }
 


  render() {
      var data = []

      if (this.state && this.state.events && this.state.events.length > 0) {
        for (let i = 0; i < this.state.events.length; i++) {
                data.push(
                            <Card border="info" style={{ width: '58rem' }}><Card.Body> 
                            <Card.Title><b>{this.state.events[i].name}</b></Card.Title>                                                      
                            <Card.Text><b> Description: </b> {this.state.events[i].description}</Card.Text>
                            <Card.Text><b> Date: </b> {this.state.events[i].date.split('T')[0]}</Card.Text>
                            <Card.Text><b> Time: </b> {this.state.events[i].time}</Card.Text>
                            <Card.Text><b> Location: </b> {this.state.events[i].location}</Card.Text>
                            <Card.Text><b> Trending Hashtags: </b> {this.state.events[i].hashtags}</Card.Text>
                            <button class="btn btn-primary" value={this.state.events[i]._id}  onClick={this.register}>Register</button>

                            <Card.Text> </Card.Text>
                        </Card.Body></Card>)
            
        }
    }
    return (
      
      

      <div>
        < CustomerLoginCheck />

        <table class="table eventtable">
          <tr>
            <td>
              {this.state.textbox}
            </td>
            <td>
            <button class="icon" onClick={this.search}><i class="glyphicon glyphicon-search"></i></button>
            </td>
          </tr>
        </table>
        {data}
      </div>
     )
  }
}

export default EventRegister;