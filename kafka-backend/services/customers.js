
//   var books = [
//     {"BookID" : "1", "Title" : "Book 1", "Author" : "Author 1"},
//     {"BookID" : "2", "Title" : "Book 2", "Author" : "Author 2"},
//     {"BookID" : "3", "Title" : "Book 3", "Author" : "Author 3"},
    
// ]
// import bookModel from "../../backend/models/books.model";

// const mongoose = require('mongoose');
const customersModel = require('../models/customers.model');
var mongoose = require('mongoose');

// const { mongoDB, frontendURL } = require('../../backend/config/mongo.config');

// var options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     poolSize: 500,
//     bufferMaxEntries: 0
// };

// mongoose.connect(mongoDB, options, (err, res) => {
//     if (err) {
//         console.log(err);
//         console.log(`MongoDB Connection Failed`);
//     } else {
//         console.log(`MongoDB Connected`);
//     }
// });

// const handle_request = async (msg, callback) => {
function handle_request(msg, callback){
   
    console.log("Inside customers kafka backend");
    console.log(msg);

  let newbook = new customersModel({name: msg.name,
    email: msg.email,
    password: msg.password })
  
  console.log("New book is", newbook)

  if (!newbook) {
    callback(null, {message: "Not Done"})

  }
  if (!callback) {
    return newbook
  }

  customersModel.findOne({ email: msg.email }, (error, book) => {
      console.log("Finding book")
      if (error) {
          callback(error, {"status": "error"})
      }
      if (book) {
          console.log("Book already exists")
          // res.writeHead(400, {
          //     'Content-Type': 'text/plain'
          // })
          // res.end("Book ID already exists");
          callback({"status": "error"}, {"status": "error"})
      }
      else {
        console.log("Book not found, create one")
          newbook.save(function (error, data) {
              if (error) {
                callback({"status": "error"}, {"status": "error"})
              }
              else {
                callback(null, {"status": "SUCCESS"})
              }
          });
      }
  });
     // Validate request
    // if (!req.body.name) {
    //   res.status(400).send({
    //     message: "Content can not be empty!"
    //   });
    //   return;
    // }
    // let hashedPassword = passwordHash.generate(req.body.password);
    // // Create a Tutorial
    // const r = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: hashedPassword
    // };
  
    // // Save Tutorial in the database
    // restaurants.create(r)
    //   .then(data => {
    //     data.message = "SUCCESS";
    //     value = {message: "SUCCESS", id: data.id}
    //     res.send(value);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the restaurant."
    //     });
    //   });
}

exports.handle_request = handle_request;

// export {
//   handle_request
// };
