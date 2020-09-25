const express = require("express");
const app = express.Router();

const restaurants = require("../controllers/restaurants.controller.js");
const dishes = require("../controllers/dishes.controller.js");
const reviews = require("../controllers/reviews.controller.js");
const restaurantsProfile  = require("../controllers/restaurantsProfile.controllers.js");

app.get("/", (req, res) => res.send("Hello World !"));

//Route to handle Post Request Call
app.post('/info', restaurants.create)

app.post('/validate', restaurants.validate)

app.get('/info', restaurants.findAll)

//Route to get restaurants by name
app.get('/info/:name', restaurants.findByName)

//Route to get menu in a selected restaurant
app.get('/:restaurantName/dishes', dishes.findAll)

app.post('/:restaurantName/dishes', dishes.create)
// app.get('/:restaurantName/dishes/:dishName', dishes.findByName)

app.post('/:restaurantId/profile', restaurantsProfile.createOrUpdate)
// Get reviews of the restaurant
// app.get('/:restaurantId/reviews', reviews.findAll)
app.get('/:restaurantId/profile', restaurantsProfile.findOne)

module.exports = app;
