// import React, { Component } from 'react';
// import '../../App.css';
// import backendServer from '../../config';
// import { Card } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { restaurantMenu } from '../../actions/restaurantMenuActions';


// class RestaurantMenu extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.props.restaurantMenu();
//   } 

//   // getRestaurantMenu = () => {
     
//   //   const id = localStorage.getItem('restaurant_id')
//   //   axios.get(`${backendServer}/restaurants/${id}/dishes`)
//   //   .then(response => {
//   //       this.setState({
//   //           dishes: response.data
//   //       });
//   //   });


//   // }
//   render() {
//       var data = []

//       if (this.props.user && this.props.user.length > 0) {
//         for (var i = 0; i < this.props.user.length; i++) {
//           console.log("menu props:", this.props.user)
//           let imgsrc = `${backendServer}/restaurants/${this.props.user[i].id}/dishImage`
//             data.push(<Card border='info' border-width='10px' style={{ width: '60%' , color: 'black' , }}> <Card.Body> 
//                           <div class="d-flex">
//                             <div class="mx-auto pull-left">
//                             <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
//                             </div>
//                             <div class="mx-auto pull-right">
//                           <Card.Title><b>{this.props.user[i].name}</b></Card.Title>
                          
//                           <Card.Text><b> Category: </b> {this.props.user[i].category}</Card.Text>
//                           <Card.Text><b> Ingredients: </b>  {this.props.user[i].ingredients}</Card.Text>
//                           <Card.Text><b> Description: </b> {this.props.user[i].description}</Card.Text>
//                           <Card.Text><b> Price: </b> {this.props.user[i].price}</Card.Text>
//                           </div>
//                           </div>
//                       </Card.Body> </Card>)
//         }
//     }


//     return (
//       <div>
//         {data}
//       </div>
//     )
//   }
// }


// RestaurantMenu.propTypes = {
//   restaurantMenu: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired
// }


// const mapStateToProps = state => ({
//   user: state.restaurantMenu.user
// });

// export default connect(mapStateToProps, { restaurantMenu })(RestaurantMenu);

import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import { Card, Row, Col } from 'react-bootstrap';


class RestaurantMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getRestaurantMenu();
  } 

  getRestaurantMenu = () => {
     
    const id = localStorage.getItem('restaurant_id')
    axios.get(`${backendServer}/restaurants/${id}/dishes`)
    .then(response => {
        this.setState({
            dishes: response.data.updatedList
        });
    });


  }
  render() {
      var data = []

      if (this.state && this.state.dishes && this.state.dishes.length > 0) {
        for (var i = 0; i < this.state.dishes.length; i++) {
          let imgsrc = `${backendServer}/restaurants/${this.state.dishes[i].id}/dishImage`
            data.push(<Card border='info' border-width='10px' style={{ width: '60%' , color: 'black' , }}> <Card.Body> 
                          <div class="d-flex">
                            <div class="mx-auto pull-left">
                            <Card.Img variant="top" class="dish-image" src={imgsrc}></Card.Img>
                            </div>
                            <div class="mx-auto pull-right">
                          <Card.Title><b>{this.state.dishes[i].name}</b></Card.Title>
                          
                          <Card.Text><b> Category: </b> {this.state.dishes[i].category}</Card.Text>
                          <Card.Text><b> Ingredients: </b>  {this.state.dishes[i].ingredients}</Card.Text>
                          <Card.Text><b> Description: </b> {this.state.dishes[i].description}</Card.Text>
                          <Card.Text><b> Price: </b> {this.state.dishes[i].price}</Card.Text>
                          </div>
                          </div>
                      </Card.Body> </Card>)
        }
    }


    return (
      <div>
        {data}
      </div>
    )
  }
}


export default RestaurantMenu;