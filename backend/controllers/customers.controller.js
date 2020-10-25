const db = require("../models");
const customers = db.customers;
const Op = db.Sequelize.Op;

exports.findOne = (req, res) => {
  var customerId = req.params.customerId
  var condition = customerId ? { id: { [Op.eq]: `${customerId}` } } : null;
  customers.findOne({where: condition})
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the customerProfile."
          });
        });
    }

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content cannot be empty!"
      });
      return;
    }
  
    const c = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    
    customers.create(c)
      .then(data => {
        data.message = "SUCCESS";
        value = {message: "SUCCESS", id: data.id}
        res.send(value);
        // res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the customer."
        });
      });
  };

  exports.validate = (req, res) => {
    const username = req.body.username;
    const pwd = req.body.password;
    var condition = username ? { email: { [Op.eq]: `${username}` } } : null;
  
    customers.findOne({ where: condition })
      .then(data => {
        if (!data) {
          res.status(401).send({
            message: "INVALID_CREDENTIALS"
          });
        }
        else if (data.dataValues.password === pwd){
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
    const id = req.params.customerId;
    var condition = id ? { id: { [Op.eq]: `${id}` } } : null;
    const newDetails = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    customers.update(newDetails, { where: condition })
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