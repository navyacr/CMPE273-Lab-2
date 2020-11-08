import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card } from 'react-bootstrap';
import CustomerLoginCheck from './customerLoginCheck';
import AggregateReview from './aggregateReview';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurants } from '../../actions/customerHomeActions';
import ReactPaginate from 'react-paginate';
import '../restaurant/pagination.css';
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
      count: 0,
      offset: 0,
      perPage: 4,
      currentPage: 0,
      pageCount: 1,
      restaurants: []
    };
    this.getRestaurants();
  } 

  componentDidMount() {
    this.setState({
      all: this.state.restaurants
    });
  }
  
  componentWillReceiveProps(props){
    this.setState({
      ...this.state,
      all : props.user,
      restaurants: props.user,
      allrestaurants: props.user,
      pageCount: Math.ceil(this.state.restaurants.length / this.state.perPage)
    }
   );
  }
  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
        currentPage: selectedPage,
        offset: offset
    }
    );
  };
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
        console.log("Show Response: ", response)
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
    this.props.getRestaurants();
  }

  setCount = (count) => {
    this.setState({
      qty: count
    })
  }

  handlePageClick = e => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({
        currentPage: selectedPage,
        offset: offset
    }
    );
  };
  render() {
    const options = [
      {value: 'cuisine', label: 'Cuisine'},
      {value: 'deliverymode', label: 'Mode of Delivery'},
      {value: 'location', label: 'Location'},
      {value: 'dishname', label: 'Dish Name'},
      {value: 'restaurantname', label: 'Restaurant Name'}

    ]
    const defaultOption = options[4]

    const count = this.state.restaurants.length;
    console.log('restaurants: ', this.props.user)
    const slice = this.state.restaurants.slice(this.state.offset, this.state.offset + this.state.perPage);
    const testResult = slice.map((item,key)=>
      
      <div class="row">
        
        <Card border='info' border-width='10px' style={{ width: '100%' , color: 'black' , }}><Card.Body> 
          <div class="d-flex">
            <div class="mx-auto pull-left">
              <Card.Img variant="top" class="dish-image" src={backendServer+"/restaurants/"+item._id+"/viewProfileImage"}></Card.Img>
            </div>
          <div class="mx-auto pull-right">
          <a style={{ cursor: 'pointer' }} href={"/oneRestaurantView/" + item._id}>
            <Card.Title><b>{item.name}</b></Card.Title>
          </a>
              <AggregateReview resid={item._id}/>
              
              <Card.Text><b> Delivery modes: </b> {item.deliverymode}</Card.Text>
              <Card.Text><b> Cuisine: </b> {item.cuisine}</Card.Text>
              <Card.Text><b> Description: </b> {item.description}</Card.Text>
          </div>
        </div>
        </Card.Body>
        </Card>
        <br/>
        <br/>
        <br/>
      </div> 
    );
    let paginationElement = (
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={<span className="gap">...</span>}
        pageCount={Math.ceil(this.state.restaurants.length / this.state.perPage) > 1 ? Math.ceil(this.state.restaurants.length / this.state.perPage) : 10}
        onPageChange={this.handlePageClick}
        forcePage={this.state.currentPage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous_page"}
        nextLinkClassName={"next_page"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    );

    //   var data = []

    //   if (this.state && this.state.restaurants && this.state.restaurants.length > 0) {
    //     console.log("All restaurants list:",this.state.restaurants)
    //     for (let i = 0; i < this.state.restaurants.length; i++) {
          
    //         if (this.state.restaurants[i]) {
    //             console.log(this.state.restaurants[i])
    //             var imgsrc = `${backendServer}/restaurants/${this.state.restaurants[i]._id}/viewProfileImage`;
    //             data.push(
    //                       <Card border="info" style={{ width: '100%' }}><Card.Body> 
    //                         <div class="d-flex">
    //                         <div class="mx-auto pull-left">
    //                         <img class="profile-photo" src={imgsrc}></img>
    //                         </div>
    //                         <div class="mx-auto pull-right">
    //                         <a style={{ cursor: 'pointer' }} href={"/oneRestaurantView/" + this.state.restaurants[i]._id}>
    //                           <Card.Title><b>{this.state.restaurants[i].name}</b></Card.Title>
    //                         </a>
                          
    //                       <AggregateReview resid={this.state.restaurants[i]._id}/>
    //                       <Card.Text><b> Delivery modes:  </b> {this.state.restaurants[i].deliverymode}</Card.Text>
    //                       <Card.Text><b> Cuisine:  </b> {this.state.restaurants[i].cuisine}</Card.Text>
    //                       <Card.Text><b> Description: </b> {this.state.restaurants[i].description}</Card.Text>
    //                       </div>
    //                       </div>
    //                       </Card.Body></Card>)
    //         }
    //     }
    // }
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
            {/* {data} */}
            <div className="panel">
          
            <div className="panel-body">
              <div>{testResult}</div> 
            </div>
            {paginationElement}
        </div>
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


// export default CustomerHome;

CustomerHome.propTypes = {
  getRestaurants: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  user: state.getRestaurants.user
});

export default connect(mapStateToProps, { getRestaurants })(CustomerHome);