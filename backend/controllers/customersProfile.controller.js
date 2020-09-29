const db = require("../models");
const multer = require('multer');
const path = require('path');
const customersProfile = db.customersProfile;
const Op = db.Sequelize.Op;

// Create and Save a new profile table
exports.createOrUpdate = (req, res) => {
        // First try to find the record
        const customerId = req.params.customerId;
        var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
        // Create a profile table
        const newProfile = {
          dob: req.body.dob,
          city: req.body.city,
          state: req.body.state,
          country: req.body.country,
          nickname: req.body.nickname,
          headline: req.body.headline,
          yelpsince: req.body.yelpsince,
          thingsilove: req.body.thingsilove,
          findmein: req.body.findmein,
          website: req.body.website,
          phonenumber: req.body.phonenumber,
          customerId: customerId
        };

        customersProfile.findOne({where: condition})
        .then(function (foundItem) {
            if (!foundItem) {
                // Item not found, create a new one
                customersProfile.create(newProfile)
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
             // Found an item, update it
            customersProfile.update(newProfile, {where: condition})
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                      message:
                        err.message || "Some error occurred while updating the customerProfile."
                    });
                  });
        });
  };

  exports.findOne = (req, res) => {
    const customerId = req.params.customerId;
    var condition = customerId ? { customerId: { [Op.eq]: `${customerId}` } } : null;
  
    customersProfile.findOne({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving customers."
        });
      });
  };

  // const resstorage = multer.diskStorage({
  //   destination: path.join(__dirname, '..') + '/public/uploads/restaurants',
  //   filename: (req, file, cb) => {
  //       cb(null, 'restaurant' + req.params.restaurantId + "-" + Date.now() + path.extname(file.originalname));
  //   }
  // });

  // const resuploads = multer({
  //   storage: resstorage,
  //   limits: { fileSize: 1000000 },
  // }).single("resimage");

  // exports.uploadImage = (req, res) => {
  //   resuploads(req, res, function (err) {
  //       if (!err) {
  //         // const restaurantId = req.params.restaurantId;
  //         // var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
  //         // // Create a Tutorial
  //         // const newProfile = {
  //         //   filename: req.file.filename
  //         // };
  //         // restaurantsProfile.update(newProfile, {where: condition})
  //         // .then(data => {
  //         //     res.send(data)
  //         // })
  //         // .catch(err => {
  //         //     res.status(500).send({
  //         //       message:
  //         //         err.message || "Some error occurred while updating the restaurantProfile."
  //         //     });
  //         //   });
  //       }   
  //   })
// };