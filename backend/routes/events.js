const express = require("express");
const app = express.Router();

const events = require("../controllers/events.controller.js");


//Route to handle Post Request Call
app.post('/info', events.create)
app.get('/info', events.create)



module.exports = app;
