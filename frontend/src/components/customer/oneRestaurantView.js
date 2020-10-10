import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
// import "react-flexy-table/dist/index.css";
import CustomerLoginCheck from './customerLoginCheck';
import OneRestaurantMenuView from './oneRestaurantMenuView';
import CustomerAddReview from './customerAddReview';
import CustomerViewReview from './customerViewReview';
import Dropdown from 'react-dropdown';


class OneRestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurantInfo();
  } 

  getRestaurantInfo = () => {
     
    axios.get(`${backendServer}/restaurants/${this.props.match.params.resid}/info`)
    .then(response => {
        this.setState({
            name: response.data.name,
            email: response.data.email,
            restaurantId: response.data.id
        });
    });

    axios.get(`${backendServer}/restaurants/${this.props.match.params.resid}/profile`)
    .then(response => {
        this.setState({
            description: response.data.description,
            contact: response.data.contact,
            timings: response.data.timings,
            location: response.data.location,
            deliverymode: response.data.deliverymode
        });
    });

  }
  _onSelect = (val) => {
    this.setState({
      selectedDm : val
    })
  }
  render(name) {
    console.log("DM: ", this.state.deliverymode)
    if (this.state.deliverymode) {
      var options = this.state.deliverymode.split(" ");
      this.state.selectedDm = options[0]
    }
    var imgsrc = `${backendServer}/restaurants/${this.props.match.params.resid}/viewProfileImage`;
    return (
        <div>
          <CustomerLoginCheck/>
                <div class="restaurantHome">
                    <h2 style={{color: "maroon"}}> <b>{ this.state.name } </b></h2>
                    <img class="profile-photo" src={imgsrc}></img>
                    <p> <b>Description:</b> {this.state.description}</p>                    
                    <p> <b>Phone:</b> {this.state.contact} </p>
                    <p> <b>Email:</b> {this.state.email} </p>
                    <p> <b>Our Address:</b> {this.state.location}</p>
                    <p> <b>Timings:</b> {this.state.timings} </p>
                </div>
                <div>
                  <h4 style={{color: "maroon"}}> <b> Menu: </b></h4>
                  <p>Select mode of delivery: </p>
                  < Dropdown options={options} value={this.state.selectedDm} onChange={this._onSelect}  placeholder="Delivery mode" />
                  < OneRestaurantMenuView dm={this.state.selectedDm} resid={this.props.match.params.resid}/>
                  < CustomerAddReview resid={this.props.match.params.resid}/>
                  <CustomerViewReview resid={this.props.match.params.resid}/>
                </div>
            </div>
    )
  }
}


export default OneRestaurantView;