const db = require("../models");
const restaurants = db.restaurants;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const r = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location
    };
  
    // Save Tutorial in the database
    restaurants.create(r)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the restaurant."
        });
      });
  };