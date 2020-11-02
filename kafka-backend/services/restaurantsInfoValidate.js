const Model = require('../models/restaurants.model');

function handle_request(msg, callback){
  Model.restaurantsModel.findOne({ email: msg.username}, (error, restaurant) => {
      if (error) {
          callback(error, {"status": "INVALID_CREDENTIALS"})
      }
      if (restaurant) {
        if (restaurant.password === msg.password){
          message = {"status": "SUCCESS"}
          returnVal = Object.assign(message, restaurant._doc)
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