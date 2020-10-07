const express = require("express");
const customersProfile = require("../controllers/customersProfile.controller.js");
const restaurantsProfile = require("../controllers/restaurantsProfile.controller.js");
const app = express.Router();

const customers = require("../controllers/customers.controller.js");
const orders = require("../controllers/orders.controller.js");
const reviews = require("../controllers/reviews.controller.js");

//Route to handle Post Request Call
app.post('/info', customers.create)
app.post('/:customerId/infoUpdate', customers.update)

app.get('/:customerId/info', customers.findOne)

app.post('/validate', customers.validate)

//Route to get orders of a customer
app.get('/:customerId/orders', orders.findAll)

app.post('/:customerId/orders', orders.create)

// Customer review for a restaurant
app.post('/:customerId/reviews', reviews.create)
app.get('/:restaurantId/reviews', reviews.findAll)
app.get('/:restaurantId/aggreviews', reviews.aggReview)
app.get('/:customerId/profile', customersProfile.findOne)
app.post('/:customerId/profile', customersProfile.createOrUpdate)
app.post('/restaurantsearch', restaurantsProfile.search)
app.post('/:customerId/uploadImage', customersProfile.uploadImage)
app.get('/:customerId/viewProfileImage', customersProfile.viewProfileImage)

module.exports = app;
