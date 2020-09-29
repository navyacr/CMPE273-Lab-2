const db = require("../models");
const dishes = db.dishes;
const restaurants = db.restaurants;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
    const restaurantId = req.params.restaurantId;
    var condition1 = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
  
            dishes.findAll({ where: condition1 })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving dishes."
                });
            });
    
  };


//   exports.createDish = (req, res) => {
//     const restaurantId = req.params.restaurantId;
//     const d = {
//         name: req.body.name,
//         ingredients: req.body.ingredients,
//         price: req.body.price,
//         description: req.body.description,
//         category: req.body.category,
//         restaurantId: restaurantId
//     };
            
//             // Save Restaurant in the database
//             dishes.create(d)
//                 .then(data => {
//                     res.send(data);
//                 })
//                 .catch(err => {
//                     res.status(500).send({
//                         message:
//                         error.message || "Some error occurred while creating the dish."
//                     });
//                 }); 
//   };


  exports.createOrUpdate = (req, res) => {
    // First try to find the record
    const dishName = req.params.dishName;
    var condition = dishName ? { name: { [Op.eq]: `${dishName}` } } : null;
    // Create a profile table
    const newProfile = {
        name: dishName,
        ingredients: req.body.ingredients,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        restaurantId: req.body.restaurantId
    };

    dishes.findOne({where: condition})
    .then(function (foundItem) {
        if (!foundItem) {
            // Item not found, create a new one
            dishes.create(newProfile)
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while creating the restaurantProfile."
                    });
                  });
        }
         // Found an item, update it
         dishes.update(newProfile, {where: condition})
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while updating the restaurantProfile."
                });
              });
    });
};