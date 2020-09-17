const db = require("../models");
const dishes = db.dishes;
const restaurants = db.restaurants;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const restaurantName = req.params.restaurantName;
    var condition1 = restaurantName ? { name: { [Op.eq]: `${restaurantName}` } } : null;
    restaurants.findAll({where: condition1})
        .then(data => {
  
            dishes.findAll({ where: {restaurantId: {[Op.eq]: `${data[0].dataValues.id}`} }})
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


  exports.create = (req, res) => {
    const restaurantName = req.params.restaurantName;
    var condition1 = restaurantName ? { name: { [Op.eq]: `${restaurantName}` } } : null;
    restaurants.findAll({where: condition1})
      .then(data => {
              // Create a Restaurant
            console.log("restaurant id: ", data[0].dataValues)
            const d = {
                name: req.body.name,
                ingredients: req.body.ingredients,
                price: req.body.price,
                description: req.body.description,
                restaurantId: data[0].dataValues.id
            };
            
            // Save Restaurant in the database
            dishes.create(d)
                .then(data => {
                res.send(data);
                })
                .catch(err => {
                res.status(500).send({
                    message:
                    error.message || "Some error occurred while creating the dish."
                });
                });

      })
      .catch(error => {
          res.status(500).send({
              message:
              error.message || "Some error occurred while creating the restaurant."
          });
      })

  

  };