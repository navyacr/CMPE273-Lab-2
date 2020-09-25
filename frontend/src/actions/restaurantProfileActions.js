import { GET_RESTAURANT, UPDATE_RESTAURANT } from "./types";
import backendServer from "../config"
import axios from "axios";

export const getRestaurant = () => dispatch => {
    const id = localStorage.getItem('restaurant_id')
        axios.get(`${backendServer}/restaurants/${id}/profile`)
        .then(response => response.data[0])
        .then(restaurant => dispatch({
            type: GET_RESTAURANT,
            payload: restaurant
        }))
        .catch(error => {
            console.log(error)
        })
}

export const updateRestaurant = (restaurantProfileData) => dispatch => {
    axios.defaults.withCredentials = true;
    const id = localStorage.getItem('restaurant_id')
    axios.post(`${backendServer}/restaurants/${id}/profile`, restaurantProfileData)
        .then(response => response.data)
        .then(data => {
            
            return dispatch({
                type: UPDATE_RESTAURANT,
                payload: data
            })
        })
        .then(data => {
            axios.post(`${backendServer}/restaurants/${id}/infoUpdate`, restaurantProfileData)
            .then(data => {
                alert("Profile Updated Successfully!");
                return dispatch({
                    type: UPDATE_RESTAURANT,
                    payload: data
                })
            })
        })
        .catch(error => {
            console.log(error);
        });
}