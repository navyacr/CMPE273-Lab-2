import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import "react-flexy-table/dist/index.css";
import RestaurantLoginCheck from './restaurantLoginCheck';


class OneEventAttendeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getAttendeeInfo();
  } 

  getAttendeeInfo = () => {
     
    axios.get(`${backendServer}/customers/${this.props.match.params.cusid}/info`)
    .then(response => {
        this.setState({
            name: response.data.name,
            email: response.data.email
        });
    });

    axios.get(`${backendServer}/customers/${this.props.match.params.cusid}/profile`)
    .then(response => {
        this.setState({
            dob: response.data.dob,
            city: response.data.city,
            state: response.data.state,
            country: response.data.country,
            nickname: response.data.nickname,
            headline: response.data.headline,
            yelpsince: response.data.yelpsince,
            thingsilove: response.data.thingsilove,
            findmein: response.data.findmein,
            website: response.data.website,
            phonenumber: response.data.phonenumber
        });
    });

  }
 
  render(name) {
    var imgsrc = `${backendServer}/customers/${this.props.match.params.cusid}/viewProfileImage`;
    return (
        <div>
          <RestaurantLoginCheck/>
                <div class="restaurantHome">
                    <h2 style={{color: "maroon"}}> <b>{ this.state.name } </b></h2>
                    <img class="profile-photo" src={imgsrc}></img>
                    <p> <b>Email:</b> {this.state.email}</p>                    
                    <p> <b>Phone:</b> {this.state.phonenumber} </p>
                    <p> <b>City:</b> {this.state.city} </p>
                    <p> <b>State:</b> {this.state.state}</p>
                    <p> <b>Country:</b> {this.state.country} </p>
                <h2 style={{color: "maroon"}}> <b>More Details: </b></h2>
                    <p> <b>DOB:</b> {this.state.dob}</p>                    
                    <p> <b>Nickname:</b> {this.state.nickname} </p>
                    <p> <b>Headline:</b> {this.state.headline} </p>
                    <p> <b>Things I Love:</b> {this.state.thingsilovethingsilove}</p>
                    <p> <b>Website:</b> {this.state.website} </p>
                </div>
            </div>
    )
  }
}

export default OneEventAttendeeView;