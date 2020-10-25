import React, { Component } from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { eventView } from '../../actions/eventViewActions'

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.props.eventView();
  } 
  

  render() {
      var data = []
      console.log("user props", this.props.user)
      if (this.props.user && this.props.user.length > 0) {
        for (let i = 0; i < this.props.user.length; i++) {
                data.push(
                            <Card border="info" style={{ width: '40%' }}><Card.Body> 
                              <a style={{ cursor: 'pointer' }} href={"/oneEventView/" + this.props.user[i].id}>
                                <Card.Title><b>{this.props.user[i].name}</b></Card.Title>
                              </a>
                            <Card.Text><b> Description: </b> {this.props.user[i].description}</Card.Text>
                            <Card.Text><b> Date: </b> {this.props.user[i].date}</Card.Text>
                            <Card.Text><b> Time: </b> {this.props.user[i].time}</Card.Text>
                            <Card.Text><b> Location: </b> {this.props.user[i].location}</Card.Text>
                            <Card.Text><b> Trending Hashtags: </b> {this.props.user[i].hashtags}</Card.Text>
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


// export default EventView;


EventView.propTypes = {
  eventView: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.eventView.user
});

export default connect(mapStateToProps, { eventView})(EventView);