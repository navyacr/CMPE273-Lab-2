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

app.post('/:restaurantId/infoUpdate', restaurants.update)

app.post('/validate', restaurants.validate)

app.get('/info', restaurants.findAll)

//Route to get restaurants by name
app.get('/:restaurantId/info', restaurants.findById)

//Route to get menu in a selected restaurant
app.get('/:restaurantId/dishes', dishes.findAll)

app.post('/:dishName/dishes', dishes.createOrUpdate)
// app.get('/:restaurantName/dishes/:dishName', dishes.findByName)

app.post('/:restaurantId/profile', restaurantsProfile.createOrUpdate)

app.post('/:restaurantId/uploadImage', restaurantsProfile.uploadImage)
app.get('/:restaurantId/viewProfileImage', restaurantsProfile.viewProfileImage)


app.post('/:dishId/dishImage', dishes.dishUploadImage)
app.get('/:dishId/dishImage', dishes.viewDishImage)


// Get reviews of the restaurant
// app.get('/:restaurantId/reviews', reviews.findAll)
app.get('/:restaurantId/profile', restaurantsProfile.findOne)

app.get('/:restaurantId/orders', orders.findRestaurantOrders)
app.post('/:restaurantId/orders', orders.updateOrderStatus)




module.exports = app;
