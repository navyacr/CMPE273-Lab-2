const Model = require('../models/events.model');
var mongoose = require('mongoose');

function handle_request(msg, callback){
    Model.eventsModel.find().sort({date : 1})
    // .populate("customerId")
    // .populate("dishId")
    .then(function(events) {
      
      if (events) {
          callback(null, events)
      }
  });
}

exports.handle_request = handle_request;
