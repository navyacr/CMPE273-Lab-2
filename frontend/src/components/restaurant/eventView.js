import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';
import ReactFlexyTable from "react-flexy-table"
import "react-flexy-table/dist/index.css";
// import CustomerLoginCheck from './customerLoginCheck';
// import AggregateReview from './aggregateReview';
// import CustomerSearch from './searchTab';
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getEvents();
    // this.search = this.search.bind(this);
    // this.setCount = this.setCount.bind(this);
  } 

  getEvents = () => {
    // var params = {
    //   "type": this.state.type,
    //    "value": this.state.value
    // }
    // console.log(params)
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
                              {/* <a style={{ cursor: 'pointer' }} href={"/oneRestaurantView/" + this.state.restaurants[i].restaurant.id}> */}
                                <Card.Title><b>{this.state.events[i].name}</b></Card.Title>
                              {/* </a> */}
                            {/* <AggregateReview resid={this.state.restaurants[i].restaurant.id}/> */}
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
        
        {/* <table class="searchtable">
          <tr>
            <td>
            <Dropdown options={options} onChange={this._onSelect}  placeholder="Search by" />
            </td>
            <td>
              <div disabled={this.state.disabled}>
                <Dropdown options={this.state.secondoptions} onChange={this._onValueSelect} placeholder="Select" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {this.state.textbox}
            </td>
            <td>
            <button class="icon" onClick={this.search}><i class="glyphicon glyphicon-search"></i></button>
            </td>
          </tr>
        </table> */}
        {data}
      </div>
       
     )
  }
}


export default EventView;