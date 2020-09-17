const db = require("../models");
const orders = db.orders;
const dishes = db.dishes;
const customers = db.customers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => { 
    // Create a Order
    const o = {
      customerId: req.params.customerId,
      dishId: req.body.dishId
    };
  
    // Save Order in the database
    orders.create(o)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating orders."
        });
      });
};

exports.findAll = (req, res) => {
    const customerId = req.params.customerId;
    var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
    orders.findAll({where: condition})
        .then(data => {
            res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving orders."
        });
      })
    
  };

