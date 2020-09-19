const db = require("../models");
const eventAttendees = db.eventAttendees;
const Op = db.Sequelize.Op;

// Create and Save a new eventAttendees
exports.create = (req, res) => {
   
    // Create a eventAttendees
    const eA = {
      eventId: req.params.eventId,
      customerId: req.body.customerId
    };
  
    // Save Tutorial in the database
    eventAttendees.create(eA)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the eventAttendees."
        });
      });
};

exports.findAll = (req, res) => {
    const eventId = req.params.eventId;
    var condition1 = eventId ? { eventId: { [Op.eq]: `${eventId}` } } : null;
    eventAttendees.findAll({where: condition1})
        .then(data => {
            res.send(data);
        })        
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving dishes."
            });
        });
}
