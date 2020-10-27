import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import RestaurantLoginCheck from './restaurantLoginCheck';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { oneEventAttendeeView } from '../../actions/oneEventAttendeeViewActions';


class OneEventAttendeeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getAttendeeInfo();
    this.props.oneEventAttendeeView(this.props.match.params.cusid);
  } 

  getAttendeeInfo = () => {
     
    axios.get(`${backendServer}/customers/${this.props.match.params.cusid}/info`)
    .then(response => {
        this.setState({
            name: response.data.name,
            email: response.data.email
        });
    });

    // axios.get(`${backendServer}/customers/${this.props.match.params.cusid}/profile`)
    // .then(response => {
    //     this.setState({
    //         dob: response.data.dob,
    //         city: response.data.city,
    //         state: response.data.state,
    //         country: response.data.country,
    //         nickname: response.data.nickname,
    //         headline: response.data.headline,
    //         yelpsince: response.data.yelpsince,
    //         thingsilove: response.data.thingsilove,
    //         findmein: response.data.findmein,
    //         website: response.data.website,
    //         phonenumber: response.data.phonenumber
    //     });
    // });

  }
 
  render() {
    var imgsrc = `${backendServer}/customers/${this.props.match.params.cusid}/viewProfileImage`;
    return (
        <div>
          <RestaurantLoginCheck/>
                <div class="restaurantHome">
                    <h3 style={{color: "maroon"}}> <b>{ this.state.name } </b></h3>
                    <img class="profile-photo" src={imgsrc}></img>
                    <p> <b>Email:</b> {this.state.email}</p>                    
                    <p> <b>Phone:</b> {this.props.user.phonenumber} </p>
                    <p> <b>City:</b> {this.props.user.city} </p>
                    <p> <b>State:</b> {this.props.user.state}</p>
                    <p> <b>Country:</b> {this.props.user.country} </p>
                <h3 style={{color: "maroon"}}> <b>More Details: </b></h3>
                    <p> <b>DOB:</b> {this.props.user.dob}</p>                    
                    <p> <b>Nickname:</b> {this.props.user.nickname} </p>
                    <p> <b>Headline:</b> {this.props.user.headline} </p>
                    <p> <b>Things I Love:</b> {this.props.user.thingsilovethingsilove}</p>
                    <p> <b>Website:</b> {this.props.user.website} </p>
                </div>
            </div>
    )
  }
}

// export default OneEventAttendeeView;


OneEventAttendeeView.propTypes = {
  oneEventAttendeeView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.oneEventAttendeeView.user
});

export default connect(mapStateToProps, { oneEventAttendeeView })(OneEventAttendeeView);