import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import CustomerLoginCheck from './customerLoginCheck';
import AggregateReview from './aggregateReview';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
// import MapContainer from './mapComponent'

const buttons = [
  { name: "All", value: "all" },
  { name: "Dinein", value: "Dinein" },
  { name: "Curbside Pickup", value: "Pickup" },
  { name: "Yelp Delivery", value: "Delivery" }
];

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 0,
      count: 0
    };
    this.getRestaurants();
    // this.search = this.search.bind(this);
    // this.setCount = this.setCount.bind(this);
  } 

  componentDidMount() {
    this.setState({
      all: this.state.restaurants
    });
  }

  handleClick = (name) => {
    console.log(name)
    var re = new RegExp(name, 'gi');
    let filteredData = [];
    if (name === "all"){
      this.setState({restaurants: this.state.allrestaurants})
      return
    }
    filteredData = this.state.allrestaurants.filter(
      restaurants => restaurants.deliverymode && restaurants.deliverymode.match(re) 
    );  
    console.log("Filtered data: ", filteredData)
    this.setState({ restaurants: filteredData });
  };

  search = () => {
    var params = {
      "type": this.state.type,
       "value": this.state.value
    }
    console.log(params)
    axios.post(`${backendServer}/customers/restaurantsearch`, params)
    .then(response => {
        console.log("Response: ", response.data)
        this.setState({
            restaurants: response.data.updatedList
        });
    });
}
_onValueSelect = (e) => {
    this.setState({
        value: e.value
    })
}
_onInputChange = (e) => {
  this.setState({
      value: e.target.value
  });
}
_onSelect = (e) => {
this.setState({
    disabled: false,
    type: e.value
});
 console.log("Priting e: ", e)
 if (e && e.value === 'deliverymode'){
    this.setState({  
        secondoptions: [
            {value: 'Dinein', label: 'Dine In'},
            {value: 'Pickup', label: 'Curbside Pickup'},
            {value: 'Delivery', label: 'Yelp Delivery'},
          ],

    });
    
 } else if (e && e.value === 'cuisine') {
    this.setState({

        secondoptions: [
            {value: 'French', label: 'French'},
            {value: 'Mexican', label: 'Mexican'},
            {value: 'Mediterranean', label: 'Mediterranean'},
            {value: 'Indian', label: 'Indian'}
        ],
        
        
    });
} else if (e && (e.value === 'location' || e.value === 'dishname' || e.value === 'restaurantname')) {
    this.setState({
      textbox: <input type="text" onChange={this._onInputChange}/>,
        
    });
    this.setState({
        disabled: true,
    });
  }
}
  getRestaurants = () => {
     
    console.log("Making axios call")
    axios.get(`${backendServer}/restaurants/info`)
    .then(response => {
        console.log("Response is:", response.data.updatedList)
        this.setState({
            restaurants: response.data.updatedList,
            allrestaurants : response.data.updatedList
        });
    });
    console.log("State:", this.state)
  }

  setCount = (count) => {
    this.setState({
      qty: count
    })
  }
  render(name) {
    const options = [
      {value: 'cuisine', label: 'Cuisine'},
      {value: 'deliverymode', label: 'Mode of Delivery'},
      {value: 'location', label: 'Location'},
      {value: 'dishname', label: 'Dish Name'},
      {value: 'restaurantname', label: 'Restaurant Name'}

    ]
    const defaultOption = options[4]

      var data = []

      if (this.state && this.state.restaurants && this.state.restaurants.length > 0) {
        console.log("All restaurants list:",this.state.restaurants)
        for (let i = 0; i < this.state.restaurants.length; i++) {
          
            if (this.state.restaurants[i]) {
                console.log(this.state.restaurants[i])
                var imgsrc = `${backendServer}/restaurants/${this.state.restaurants[i]._id}/viewProfileImage`;
                data.push(
                          <Card border="info" style={{ width: '100%' }}><Card.Body> 
                            <div class="d-flex">
                            <div class="mx-auto pull-left">
                            <img class="profile-photo" src={imgsrc}></img>
                            </div>
                            <div class="mx-auto pull-right">
                            <a style={{ cursor: 'pointer' }} href={"/oneRestaurantView/" + this.state.restaurants[i]._id}>
                              <Card.Title><b>{this.state.restaurants[i].name}</b></Card.Title>
                            </a>
                          
                          <AggregateReview resid={this.state.restaurants[i]._id}/>
                          <Card.Text><b> Delivery modes:  </b> {this.state.restaurants[i].deliverymode}</Card.Text>
                          <Card.Text><b> Cuisine:  </b> {this.state.restaurants[i].cuisine}</Card.Text>
                          <Card.Text><b> Description: </b> {this.state.restaurants[i].description}</Card.Text>
                          </div>
                          </div>
                          </Card.Body></Card>)
            }
        }
    }
    return (
      <div>
        <CustomerLoginCheck />
        
        <table class="searchtable">
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
        </table>

        <div>
          {buttons.map(({ name, value }) => (
            <button
              class="btn btn-primary pad"
              key={name}
              value={value}
              onClick={this.handleClick.bind(this, value)}
            >
              {name}
            </button>
          ))}
        </div>
        <div class="header_menu">
          <div class="links">
            {data}
          </div>
          <div class="social_media">
          {/* <MapContainer restaurants={this.state.restaurants}/> */}
          </div>
          <div class="clearfix"></div>
      </div>
      </div>
     )
  }
}


export default CustomerHome;