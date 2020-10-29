const Model = require('../models/restaurants.model');

function handle_request(msg, callback){

  let newDish = new Model.dishModel(msg)
  
  console.log("New book is", newDish)

  if (!newDish) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return newDish
  }

  Model.restaurantsModel.findOne({ _id: msg._id }, (error, restaurant) => {
      if (error) {
          callback(error, {"status": "error"})
      }
      if (restaurant) {
        restaurant.menu.push(newDish)
        restaurant.save()
        callback(null, {"status": "SUCCESS"})  
      }
  });
}

exports.handle_request = handle_request;