const express = require("express");
const app = express.Router();

const events = require("../controllers/events.controller.js");
const eventAttendees = require("../controllers/eventAttendees.controller.js");


//Route to handle Post Request Call
app.post('/info', events.create)
app.get('/info', events.findAll)

app.post('/:eventId/attendees', eventAttendees.create)
app.get('/:eventId/attendees', eventAttendees.findAll)



module.exports = app;
