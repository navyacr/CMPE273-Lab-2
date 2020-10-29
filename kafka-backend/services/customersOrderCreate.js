const ordersModel = require('../models/orders.model');

function handle_request(msg, callback){

  let neworder = new ordersModel(msg)
  
  console.log("New order is", neworder)

  if (!neworder) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return neworder
  }
  neworder.save()
  callback(null, {"status":"SUCCESS"})

}

exports.handle_request = handle_request;