const customersModel = require('../models/customers.model');
var mongoose = require('mongoose');

function handle_request(msg, callback){
   
    console.log("Inside customers kafka backend");
    console.log(msg);

  let newcus = new customersModel({name: msg.name,
    email: msg.email,
    password: msg.password })
  
  console.log("New cus is", newcus)

  if (!newcus) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return newcus
  }

  customersModel.findOne({ email: msg.email }, (error, book) => {
      console.log("Finding book")
      if (error) {
          callback(error, {"status": "error"})
      }
      if (book) {
          console.log("Customer already exists")
          callback({"status": "error"}, {"status": "error"})
      }
      else {
        console.log("Customer not found, create one")
        newcus.save(function (error, data) {
              if (error) {
                callback({"status": "error"}, {"status": "error"})
              }
              else {
                callback(null, {"status": "SUCCESS"})
              }
          });
      }
  });
    
}

exports.handle_request = handle_request;
