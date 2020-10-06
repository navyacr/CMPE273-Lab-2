const db = require("../models");
const orders = db.orders;
const dishes = db.dishes;
const customers = db.customers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => { 

  var result = []
  
  for(dish of req.body.dishes) {
    if (dish.qty < 1) {
      continue
    }
    // Create a Order
    const o = {
      customerId: req.params.customerId,
      dishId: dish.id,
      qty: dish.qty
    };
  
    // Save Order in the database
    orders.create(o)
      .then(data => {
        result.push(data);
      })
      .catch(err => {
        // res.status(500).send({
        //   message:
        //     err.message || "Some error occurred while creating orders."
        // });
      });
  }
  res.send({"result": result})
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

