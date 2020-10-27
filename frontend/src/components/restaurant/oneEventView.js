import React, { Component } from 'react';
import '../../App.css';
// import axios from 'axios';
import backendServer from '../../config';
import RestaurantLoginCheck from './restaurantLoginCheck';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { oneEventView } from '../../actions/oneEventViewActions'


class OneEventView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.oneEventView(this.props.match.params.eventid);
  } 

  // getEventInfo = () => {
     
  //   axios.get(`${backendServer}/events/${this.props.match.params.eventid}/attendees`)
  //   .then(response => {
  //       console.log("one event response", response)
  //       this.setState({
  //           customers: response.data
  //       });
  //   });

  // }
  render() {
    var data = []

    if (this.props.user && this.props.user.length > 0) {
      for (let i = 0; i < this.props.user.length; i++) {
        var imgsrc = `${backendServer}/customers/${this.props.user[i].customer.id}/viewProfileImage`;
              data.push(
                          <Card border="info" style={{ width: '40%' }}><Card.Body> 
                            <img class="profile-photo" src={imgsrc}></img>
                            <a style={{ cursor: 'pointer' }} href={"/oneEventAttendeeView/" + this.props.user[i].customer.id}>
                              <Card.Title><b>{this.props.user[i].customer.name}</b></Card.Title>
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


// export default OneEventView;

OneEventView.propTypes = {
  oneEventView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.oneEventView.user
});

export default connect(mapStateToProps, { oneEventView })(OneEventView);