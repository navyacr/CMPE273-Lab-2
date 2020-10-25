import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
// // import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRestaurant, updateRestaurant } from '../../actions/restaurantProfileActions'
// import {restaurantsSignup} from '../../actions/signupActions'
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import backendServer from '../../config';
// import menuUpdate from '../../actions/menuActions';
import { menuUpdate } from '../../actions/menuActions';

class MenuUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // name : "",
        // category: "",
        // description : "",
        // ingredients : "",
        // price: "",
        // fileText : "ChooseImage..",
        // id:""
    }
    //Bind the handlers to this class
    this.changeHandler = this.changeHandler.bind(this);
    // this.categoryChangeHandler = this.categoryChangeHandler.bind(this);
    // this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    // this.ingredientsChangeHandler = this.ingredientsChangeHandler.bind(this);
    // this.priceChangeHandler = this.priceChangeHandler.bind(this);

    this.submitUpdate = this.submitUpdate.bind(this);
    
  }

  onImageUpload = (e) => {
    this.setState({
        filename: e.target.files[0],
        fileText: e.target.files[0].name
    });
  }

  onUserUpload = (e) => {
    const formData = new FormData();
    formData.append("image", this.state.filename);
    const uploadConfig = {
        headers: {
            "content-type": "multipart/form-data"
        }
    };
    axios.post(`${backendServer}/restaurants/${this.props.user.id}/dishImage`, formData, uploadConfig)
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
 //username change handler to update state variable with the text entered by the user
 changeHandler = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    })
}
// categoryChangeHandler = (e) =>{
//     this.setState({
//         category : e.target.value
//     })
// }

// ingredientsChangeHandler = (e) =>{
//     this.setState({
//         ingredients : e.target.value
//     })
// }
// //password change handler to update state variable with the text entered by the user
// descriptionChangeHandler = (e) => {
//     this.setState({
//         description : e.target.value
//     })
// }
// priceChangeHandler = (e) =>{
//     this.setState({
//         price : e.target.value
//     })
// }

submitUpdate = (e) => {
    e.preventDefault();
    const data = {
        name : this.state.name,
        category : this.state.category,
        description : this.state.description,
        ingredients: this.state.ingredients,
        price : this.state.price,
        restaurantId: localStorage.getItem("restaurant_id")
    }
    this.props.menuUpdate(data);
    // let dishname = this.state.name;
    // console.log(this.state.name)
    // axios.post(`${backendServer}/restaurants/${this.state.name}/dishes`, data)
    //     .then(response => {
    //         console.log(response.data)
    //         console.log("Status Code : ",response.status);
    //         if(response.status === 200){
    //             this.setState({
    //                 id: response.data.id,
    //                 authFlag : true,
    //                 err: response.data                       
    //             })
    //         }else{
    //             this.setState({
    //                 authFlag : false
    //             })
    //         }
            
    //     });
}

  render() {

    return (
        <div>
            <h3 style={{color: "maroon"}}> <b>Update Restaurant Menu:</b></h3>
            <div class='form-adjust'>
           <Form onSubmit={this.submitUpdate} >
                <Form.Row>
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Dish Name</Form.Label>
                        <Form.Control name="name"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="ingredients">
                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control name="ingredients"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control name="category"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price"
                            type="text"
                            onChange={this.changeHandler}
                             />
                    </Form.Group>
                </Form.Row>
                <ButtonGroup aria-label="Third group">
                    <Button type="submit" variant="success">Update Menu</Button>
                </ButtonGroup>
            </Form>
            <form onSubmit={this.onUserUpload}><br /><br /><br />
                      <div class="custom-file" style={{ width: "80%" }}>
                          <input type="file" class="custom-file-input" name="filename" accept="image/*" onChange={this.onImageUpload} required/>
                          <label class="custom-file-label" for="user-file">{this.state.fileText}</label>
                      </div><br /><br />
                      <Button type="submit" variant="success">Upload</Button>
            </form>
            {/* <center><Button href="/restaurantProfile">Home</Button></center> */}
        </div>
        </div>
    )
  }
}


// export default MenuUpdate;


MenuUpdate.propTypes = {
    menuUpdate: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    user: state.menuUpdate.user
});

export default connect(mapStateToProps, { menuUpdate})(MenuUpdate);