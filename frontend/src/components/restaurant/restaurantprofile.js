import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import {Button} from 'react-bootstrap';
import RestaurantMenu from './menu';
import RestaurantViewReview from './restaurantViewReview';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurant } from '../../actions/restaurantProfileActions';

class RestaurantProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileText : "ChooseImage.."
    };
    this.getRestaurantInfo();
  } 

  onImageUpload = (e) => {
    this.setState({
        filename: e.target.files[0],
        fileText: e.target.files[0].name
    });
}

onUserUpload = (e) => {
  const formData = new FormData();
  formData.append("resimage", this.state.filename);
  const uploadConfig = {
      headers: {
          "content-type": "multipart/form-data"
      }
  };
  axios.post(`${backendServer}/restaurants/${this.state.restaurantId}/uploadImage`, formData, uploadConfig)
      .then(response => {
          alert("Image uploaded successfully!");
          this.setState({
              userFileText: "Choose file...",
              user_image: response.data
          });
      })
      .catch(err => {
          console.log("Error");
      });
}
  getRestaurantInfo = () => {
     
    const id = localStorage.getItem('restaurant_id')
    axios.get(`${backendServer}/restaurants/${id}/info`)
    .then(response => {
        this.setState({
            name: response.data.updatedList.name,
            email: response.data.updatedList.email,
            restaurantId: response.data.updatedList._id,
            description: response.data.updatedList.description,
            contact: response.data.updatedList.contact,
            timings: response.data.updatedList.timings,
            location: response.data.updatedList.location,
            cuisine: response.data.updatedList.cuisine
        });
    });


  }
  render() {
    var imgsrc = `${backendServer}/restaurants/${this.state.restaurantId}/viewProfileImage`;

    return (
        <div>
                <div class="restaurantHome">
                    <h2 style={{color: "maroon"}}> <b>{ this.state.name } </b></h2>
                    <img class="profile-photo" src={imgsrc}></img>
                    <form onSubmit={this.onUserUpload}><br /><br /><br />
                      <div class="custom-file" style={{ width: "30%" }}>
                          <input type="file" class="custom-file-input" name="filename" accept="image/*" onChange={this.onImageUpload} required/>
                          <label class="custom-file-label" for="user-file">{this.state.fileText}</label>
                      </div><br /><br />
                      <Button type="submit" variant="primary">Upload</Button>
                    </form>
                    <p> <b>Cuisine:</b> {this.state.cuisine}</p>
                    <p> <b>Description:</b> {this.state.description}</p>
                    <p> <b>Phone:</b> {this.state.contact} </p>
                    <p> <b>Email:</b> {this.state.email} </p>
                    <p> <b>Our Address:</b> {this.state.location}</p>
                    <p> <b>Timings:</b> {this.state.timings} </p>
                </div>
                <div>
                  <h4 style={{color: "maroon"}}><b> Menu: </b></h4>
                </div>
                <div>
                  < RestaurantMenu />
                </div>
                
                <div>
                  < RestaurantViewReview />
                </div>
                
                
            </div>
    )
  }
}
export default RestaurantProfile;

// RestaurantProfile.propTypes = {
//   getRestaurant: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired
// }


// const mapStateToProps = state => ({
//   user: state.getRestaurant.user
// });

// export default connect(mapStateToProps, { getRestaurant })(RestaurantProfile);