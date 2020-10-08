const db = require("../models");
const events = db.events;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const e = {
      name: req.body.name,
      description: req.body.description,
      time: req.body.time,
      date: req.body.date,
      location: req.body.location,
      hashtags: req.body.hashtags
    };
  
    // Save Tutorial in the database
    events.create(e)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the event."
        });
      });
  };

  exports.findAll = (req, res) => {
    
    events.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving events."
        });
      });
  };

  exports.search = (req, res) => {
    var value = req.body.value
      var condition =  { name : { [Op.like]: `%${value}%` } }
      events.findAll({
      where: condition,
      
    }).then((data) => {
          res.send(data)
          console.log("*********************\n\n\n\n\n",data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the restaurantProfile."
      });
    });


    }