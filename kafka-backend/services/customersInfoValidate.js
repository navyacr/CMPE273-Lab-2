const customersModel = require('../models/customers.model');

function handle_request(msg, callback){
  customersModel.findOne({ email: msg.username}, (error, customer) => {
      if (error) {
          callback(error, {"status": "INVALID_CREDENTIALS"})
      }
      if (customer) {
        if (customer.password === msg.password){
          message = {"status": "SUCCESS"}
          returnVal = Object.assign(message, customer._doc)
          callback(null, returnVal)
        }
        else{
          callback(error, {"status": "INVALID_CREDENTIALS"})
        }
          
      }
      else{
        callback(error, {"status": "INVALID_CREDENTIALS"})
      }
  });
}

exports.handle_request = handle_request;