import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import backendServer from '../../config';
import StarRatings from 'react-star-ratings';

//Define a Login Component
class CustomerAddReview extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);    
        this.state = {     
        };   
        //Bind the handlers to this class
        this.changeHandler = this.changeHandler.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.submitReview = this.submitReview.bind(this);
    }
    
    //username change handler to update state variable with the text entered by the user
    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    changeRating( newRating, name ) {
        this.setState({
          rating: newRating
        });
    }
    
    //submit Login handler to send a request to the node backend
    submitReview = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            rating : this.state.rating,
            description : this.state.description,
            restaurantId: this.props.resid
        }
        let cusid = localStorage.getItem('customer_id')
        //make a post request with the user data
        axios.post(`${backendServer}/customers/${cusid}/reviews`,data)
            .then(response => {
                console.log(response.data)
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    alert("Review added. Thank you.")
                    
                }else{
                    alert('Oops!! something went wrong, Try again.')
                }
                
            });
    }

    render(){
        
        return(
            <div class="review-group">
                        
                <h4>Add review</h4>
                            
                    <form onSubmit={this.submitReview}>                        
                        {/* <div class="form-group">
                            <input onChange = {this.changeHandler} type="text" class="form-control" name="rating" placeholder="Rating" required/>
                        </div> */}
                        <StarRatings
                            rating={this.state.rating}
                            starRatedColor="orange"
                            starDimension="25px"
                            starSpacing='2px'
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating' />
                        <div class="form-group">
                            <input onChange = {this.changeHandler} type="text" class="review-form" name="description" placeholder="Description"/>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Review</button>                 
                       
                            
                            
                    </form>

                    </div> 
               
        )
    }
}

//export Login Component
export default CustomerAddReview;