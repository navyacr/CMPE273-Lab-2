const express = require("express");
const app = express.Router();

const restaurants = require("../controllers/restaurants.controller.js");
const dishes = require("../controllers/dishes.controller.js");
const reviews = require("../controllers/reviews.controller.js");
const restaurantsProfile  = require("../controllers/restaurantsProfile.controller.js");
const orders  = require("../controllers/orders.controller.js");

app.get("/", (req, res) => res.send("Hello World !"));

//Route to handle Post Request Call
app.post('/info', restaurants.create)
app.get('/info', restaurants.findAll)

app.post('/:restaurantId/infoUpdate', restaurants.update)

// TODO
app.post('/validate', restaurants.validate)

//Route to get restaurants by name
app.get('/:restaurantId/info', restaurants.findById)

app.post('/:dishName/dishes', restaurants.createOrUpdateDish)
//Route to get menu in a selected restaurant
app.get('/:restaurantId/dishes', dishes.findAll)

// TODO
app.post('/:restaurantId/uploadImage', restaurantsProfile.uploadImage)
app.get('/:restaurantId/viewProfileImage', restaurantsProfile.viewProfileImage)

// TODO
app.post('/:dishId/dishImage', dishes.dishUploadImage)
app.get('/:dishId/dishImage', dishes.viewDishImage)

app.post('/message', restaurants.postMessage)
app.post('/getMessage', restaurants.getMessage)


// Get reviews of the restaurant
// app.get('/:restaurantId/reviews', reviews.findAll)

app.get('/:restaurantId/orders', orders.findRestaurantOrders)
app.post('/:restaurantId/orders', orders.updateOrderStatus)




module.exports = app;
