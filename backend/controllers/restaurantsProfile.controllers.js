const db = require("../models");
const restaurantsProfile = db.restaurantsProfile;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createOrUpdate = (req, res) => {
        // First try to find the record
        const restaurantId = req.params.restaurantId;
        var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
        // Create a Tutorial
        const newProfile = {
            description: req.body.description,
            contact: req.body.contact,
            timings: req.body.timings,
            location: req.body.location,
            restaurantId: restaurantId
        };

        restaurantsProfile.findOne({where: condition})
        .then(function (foundItem) {
            if (!foundItem) {
                // Item not found, create a new one
                restaurantsProfile.create(newProfile)
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
            restaurantsProfile.update(newProfile, {where: condition})
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

  exports.findOne = (req, res) => {
    const restaurantId = req.params.restaurantId;
    var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
  
    restaurantsProfile.findOne({ where: condition })
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