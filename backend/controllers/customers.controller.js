const db = require("../models");
const customers = db.customers;
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
    const c = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
  
    // Save Tutorial in the database
    customers.create(c)
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