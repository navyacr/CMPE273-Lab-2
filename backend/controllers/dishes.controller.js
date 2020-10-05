const db = require("../models");
const dishes = db.dishes;
const Op = db.Sequelize.Op;
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

const dishstorage = multer.diskStorage({
    destination: path.join(__dirname, '..') + '/public/uploads/dishes',
    filename: (req, file, cb) => {
        cb(null, 'dish' + "-" + Date.now() + path.extname(file.originalname));
    }
  });

const dishuploads = multer({
    storage: dishstorage,
    // limits: { fileSize: 1000000 },
  }).single("image");

  exports.dishUploadImage = (req, res) => {
    
    dishuploads(req, res, function (err) {
        if (!err) {
          // res.status(200).send()
          const dishId = req.params.dishId;
          var condition = dishId ? { id: { [Op.eq]: `${dishId}` } } : null;
          // Create a Tutorial
          const newProfile = {
            filename: req.file.filename
          };
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
        } else {
          res.status(404).send(err)
        }
    })
};

exports.viewDishImage = (req, res) =>{
  const dishId = req.params.dishId;
    var condition = dishId ? { id: { [Op.eq]: `${dishId}` } } : null;
  
    dishes.findOne({ where: condition })
      .then(data => {
        var image = path.join(__dirname, '..') + '/public/uploads/dishes/' + data.filename;
        if (fs.existsSync(image)) {
            res.sendFile(image);
        }
        else {
            res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
        }
      })
      .catch(err => {
        res.sendFile(path.join(__dirname, '..') + '/public/uploads/restaurants/restaurant-1601843772667.jpg')
        res.send("Error")
      });
};