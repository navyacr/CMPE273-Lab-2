const restaurantsModel = require('../models/restaurants.model');

function handle_request(msg, callback){

  let newrestaurant = new restaurantsModel(msg)
  
  console.log("New book is", newrestaurant)

  if (!newrestaurant) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return newrestaurant
  }

  restaurantsModel.findOne({ email: msg.email }, (error, restaurant) => {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (restaurant) {
          console.log("Restaurant already exists")
          callback({"status": "error"}, {"status": "error"})
      }
      else {
          newrestaurant.save(function (error, data) {
              if (error) {
                callback({"status": "error"}, {"status": "error"})
              }
              else {
                callback(null, {"status": "Done", data})
              }
          });
      }
  });
}

exports.handle_request = handle_request;