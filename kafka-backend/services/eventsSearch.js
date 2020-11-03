const Model = require('../models/events.model');
const dishesModel = require('../models/dishes.model');
const { model } = require('../models/dishes.model');

function handle_request(msg, callback){
  Model.eventsModel.find({name : new RegExp(msg.value, 'i')})
    // .populate("restaurantId")
    .then(function(output) {
      if (output) {
        console.log("search by eventname:", output)
        callback(null, output)  
      }
    });

}

exports.handle_request = handle_request;

// var type = req.body.type
    // var value = req.body.value
    // if (type === 'dishname'){
    //   var condition =  { name : { [Op.like]: `%${value}%` } }
    //   dishes.findAll({
    //   where: condition,
    //   include: [{
    //       model: restaurants,
    //       where: {}
    //   }]
    // }).then((data) => {
    //       res.send(data)
    //       console.log("*********************\n\n\n\n\n",data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while updating the restaurantProfile."
    //   });
    // });
    // }

    // if (type === 'restaurantname'){
    //   var condition =  { name : { [Op.like]: `%${value}%` } }
    //   restaurantsProfile.findAll({
    //   // where: condition,
    //   include: [{
    //       model: restaurants,
    //       where: condition
    //   }]
    // }).then((data) => {
    //       res.send(data)
    //       console.log("*********************\n\n\n\n\n",data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while searching the restaurantProfile."
    //   });
    // });
    // }

    // if (type === 'location'){
    //   var condition =  { location : { [Op.like]: `%${value}%` } }
    //   restaurantsProfile.findAll({
    //   where: condition,
    //   include: [{
    //       model: restaurants,
    //       where: {}
    //   }]
    // }).then((data) => {
    //       res.send(data)
    //       console.log("*********************\n\n\n\n\n",data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while updating the restaurantProfile."
    //   });
    // });


    // var condition =  { [type] : { [Op.eq]: `${value}` } }
    // restaurantsProfile.findAll({
    //   where: condition,
    //   include: [{
    //       model: restaurants,
    //       where: {}
    //   }]
    // }).then((data) => {
    //       res.send(data)
    //       console.log("*********************\n\n\n\n\n",data);
    // })
    // .catch(err => {
    //   res.status(500).send({
    //     message:
    //       err.message || "Some error occurred while updating the restaurantProfile."
    //   });
    // });