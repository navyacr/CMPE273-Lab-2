const customersModel = require('../models/customers.model');

// const handle_request = async (msg, callback) => {
function handle_request(msg, callback){
   
    console.log("Inside customers kafka backend");
    console.log(msg);

  let newcus = new customersModel({
    name: msg.name,
    email: msg.email,
    password: msg.password 
  })
  
  console.log("New cus is", newcus)

  if (!newcus) {
    callback(null, {"message": "Validation error"})

  }
  if (!callback) {
    return newcus
  }

  customersModel.findOne({ email: msg.email }, (error, customer) => {
      console.log("Finding book")
      if (error) {
          callback(error, {"message": "Validation error"})
      }
      if (customer) {
          console.log("Customer already exists")
          callback({"message": "Validation error"}, {"message": "Validation error"})
      }
      else {
        console.log("Customer not found, create one")
          newcus.save(function (error, data) {
              if (error) {
                callback({"message": "Validation error"}, {"message": "Validation error"})
              }
              else {
                callback(null, {"message": "SUCCESS", "id": data._id, "data": data})
              }
          });
      }
  });
}

exports.handle_request = handle_request;