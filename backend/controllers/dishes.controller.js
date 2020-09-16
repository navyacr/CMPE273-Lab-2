const db = require("../models");
const dishes = db.dishes;
const restaurants = db.restaurants;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const restaurantName = req.params.restaurantName;
    var condition1 = restaurantName ? { name: { [Op.eq]: `${restaurantName}` } } : null;
    restaurants.findAll({where: condition1})
      .then(data => {
  
        dishes.findAll({ where: {restaurantId: {[Op.eq]: `${data.id}`} }})
        .then(data => {
            res.send(data);
      })
      .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving dishes."
            });
      });

    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving restaurants."
        });
    })
    
  };