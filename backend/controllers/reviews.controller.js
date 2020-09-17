const db = require("../models");
const reviews = db.reviews;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
      
    // Create a review
    const r = {
      rating: req.body.rating,
      description: req.body.description,
      restaurantId: req.body.restaurantId,
      customerId : req.params.customerId
    };
  
    // Save Tutorial in the database
    reviews.create(r)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the review."
        });
      });
  };

//   exports.findByName = (req, res) => {
//     const name = req.params.name;
//     var condition = name ? { name: { [Op.eq]: `${name}` } } : null;
  
//     restaurants.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving restaurants."
//         });
//       });
//   };

//   exports.findAll = (req, res) => {
//     restaurants.findAll()
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving all restaurants."
//         });
//       });
//   };