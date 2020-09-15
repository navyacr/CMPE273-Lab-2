const express = require("express");
const app = express.Router();

const customers = require("../controllers/customers.controller.js");


//Route to handle Post Request Call
app.post('/info', customers.create)

module.exports = app;
