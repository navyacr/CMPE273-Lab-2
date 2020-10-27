const db = require("../models");
const restaurants = db.restaurants;
const restaurantsProfile = db.restaurantsProfile;
const Op = db.Sequelize.Op;
const passwordHash = require('password-hash');
var kafka = require('../kafka/client');
const bookModel = require('../models/books.model');

// Create and Save a new Tutorial
exports.create = (req, res) => {

  // var newbook = new bookModel({
  //   BookID: req.body.BookID,
  //   Title: req.body.Title,
  //   Author: req.body.Author
  // });
  // newbook.save((error, data) => {
  //   if (error) {
  //     res.send(error)
  //     // callback({"status": "error"}, {"status": "error"})
  //   }
  //   else {
  //     res.send(data)
  //     // callback(null, {"status": "Done"})
  //   }
  // });

  kafka.make_request('res_post_info',req.body, function(err,results){
    console.log('in result');
    console.log(results);
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
        console.log("Inside else");
            res.json({
                updatedList:results
            });

            res.end();
        }
    
});
   
  };

  exports.findById = (req, res) => {
    const id = req.params.restaurantId;
    var condition = id ? { id: { [Op.eq]: `${id}` } } : null;
  
    restaurants.findOne({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving restaurants."
        });
      });
  };

  exports.findAll = (req, res) => {
    restaurantsProfile.findAll({
      where: {},
      include: [{
          model: restaurants,
          where: {}
      }]
    }).then((data) => {
          res.send(data)
          console.log("*********************\n\n\n\n\n",data);
    });
  };

  exports.validate = (req, res) => {
    const username = req.body.username;
    
    const pwd = req.body.password;
    var condition = username ? { email: { [Op.eq]: `${username}` } } : null;
  
    restaurants.findOne({ where: condition })
      .then(data => {
        if (!data) {
          res.status(401).send({
            message: "INVALID_CREDENTIALS"
          });
        }
        else if (passwordHash.verify(pwd, data.dataValues.password)){
          message = {message: "SUCCESS"}
          returnVal = Object.assign(message, data.dataValues)
          res.status(200).send(returnVal)
        }
        else{
          res.status(401).send({
            message: "INVALID_CREDENTIALS"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while logging in."
        });
      });
  };

  exports.update = (req, res) => {
    const id = req.params.restaurantId;
    var condition = id ? { id: { [Op.eq]: `${id}` } } : null;
    const newDetails = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    restaurants.update(newDetails, { where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating restaurants."
        });
      });
  };