const express = require("express");
const app = express.Router();

const customers = require("../controllers/customers.controller.js");
const orders = require("../controllers/orders.controller.js");
const reviews = require("../controllers/reviews.controller.js");

//Route to handle Post Request Call
app.post('/info', customers.create)

app.post('/validate', customers.validate)


//Route to get orders of a customer
app.get('/:customerId/orders', orders.findAll)

app.post('/:customerId/orders', orders.create)

// Customer review for a restaurant
app.post('/:customerId/reviews', reviews.create)


module.exports = app;
