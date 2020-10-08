import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import {Button} from 'react-bootstrap';
import RestaurantMenu from './menu';
import RestaurantViewReview from './restaurantViewReview';

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
            name: response.data.name,
            email: response.data.email,
            restaurantId: response.data.id
        });
    });

    axios.get(`${backendServer}/restaurants/${id}/profile`)
    .then(response => {
        this.setState({
            // console.log(response.data);
            description: response.data.description,
            contact: response.data.contact,
            timings: response.data.timings,
            location: response.data.location
            // restaurantId: response.data[0].id
        });
    });

  }
  render(name) {
    var imgsrc = `${backendServer}/restaurants/${this.state.restaurantId}/viewProfileImage`;

    return (
        <div>
                <div class="restaurantHome">
                    <h2 style={{color: "maroon"}}> <b>{ this.state.name } </b></h2>
                    <img class="profile-photo" src={imgsrc}></img>
                    <form onSubmit={this.onUserUpload}><br /><br /><br />
                      <div class="custom-file" style={{ width: "80%" }}>
                          <input type="file" class="custom-file-input" name="filename" accept="image/*" onChange={this.onImageUpload} required/>
                          <label class="custom-file-label" for="user-file">{this.state.fileText}</label>
                      </div><br /><br />
                      <Button type="submit" variant="primary">Upload</Button>
                    </form>
                    {/* <div> <Link to='/restaurantprofileupdate'>Update Profile</Link></div> */}
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