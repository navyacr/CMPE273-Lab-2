const db = require("../models");
const restaurants = db.restaurants;
const restaurantsProfile = db.restaurantsProfile;
const Op = db.Sequelize.Op;
const passwordHash = require('password-hash');

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    let hashedPassword = passwordHash.generate(req.body.password);
    // Create a Tutorial
    const r = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    };
  
    // Save Tutorial in the database
    restaurants.create(r)
      .then(data => {
        data.message = "SUCCESS";
        value = {message: "SUCCESS", id: data.id}
        res.send(value);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the restaurant."
        });
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