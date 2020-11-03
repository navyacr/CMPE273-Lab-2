import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';

class CustomerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getCustomerInfo();
  } 

  getCustomerInfo = () => {
     
    const id = localStorage.getItem('customer_id')
    // axios.get(`${backendServer}/customers/${id}/info`)
    // .then(response => {
    //     this.setState({
    //         name: response.data.updatedListname,
    //         email: response.data.email,
    //         customerId: response.data._id
    //     });
    // });

    axios.get(`${backendServer}/customers/${id}/profile`)
    .then(response => {
        this.setState({
            name: response.data.updatedList.name,
            email: response.data.updatedList.email,
            customerId: response.data.updatedList._id,
            dob: response.data.updatedList.dob,
            city: response.data.updatedList.city,
            state: response.data.updatedList.state,
            country: response.data.updatedList.country,
            nickname: response.data.updatedList.nickname,
            headline: response.data.updatedList.headline,
            yelpsince: response.data.updatedList.yelpsince.split('T')[0],
            thingsilove: response.data.updatedList.thingsilove,
            findmein: response.data.updatedList.findmein,
            website: response.data.updatedList.website,
            phonenumber: response.data.updatedList.phonenumber,
            customerId: response.data.updatedList._id
        });
    });

  }
  render() {
    const id = localStorage.getItem('customer_id')
    var imgsrc = `${backendServer}/customers/${id}/viewProfileImage`;

    return (
        <div>
          <div class="customerHome">
            <h3 style={{color: "maroon"}}> <b>Basic details</b></h3>
              <img class="profile-photo" src={imgsrc}></img>
              <p> <b>Name:</b> {this.state.name}</p>
              <p> <b>Date of Birth:</b> {this.state.dob} </p>
              <p> <b>City:</b> {this.state.city} </p>
              <p> <b>State:</b> {this.state.state}</p>
              <p> <b>Country:</b> {this.state.country} </p>
              <p> <b>Nickname:</b> {this.state.nickname} </p>
              <p> <b>Headline:</b> {this.state.headline} </p>
            <h3 style={{color: "maroon"}}> <b>About</b></h3>
              <p> <b>Yelping Since:</b> {this.state.yelpsince} </p>
              <p> <b>Things I love:</b> {this.state.thingsilove} </p>
              <p> <b>Find me in:</b> {this.state.findmein} </p>
              <p> <b>Website:</b> {this.state.website} </p>
            <h3 style={{color: "maroon"}}> <b>Contact Information</b></h3>
              <p> <b>Phone Number:</b> {this.state.phonenumber} </p>                    
              <p> <b>Email:</b> {this.state.email} </p> 
          </div>
        </div>
    )
  }
}


export default CustomerProfile;