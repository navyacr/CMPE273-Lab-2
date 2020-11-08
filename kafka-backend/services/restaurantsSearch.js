const Model = require('../models/restaurants.model');
const dishesModel = require('../models/dishes.model');

function handle_request(msg, callback){
  if (msg.type === 'dishname'){
      // var condition =  { name : { [Op.like]: `%${value}%` } }
      dishesModel.find({ name : new RegExp(msg.value, 'i')})
      .populate("restaurantId")
      .then(function(output) {
        if (output) {
          console.log("search by dish name:", output)
          var returnVal =[]; 
          for (var i in output){
            returnVal.push(output[i].restaurantId)
          }
          console.log("returnVal:", returnVal)
          callback(null, returnVal)
        }
      });
  }
  if (msg.type === 'restaurantname'){
    // var condition =  { name : { [Op.like]: `%${value}%` } }
    Model.restaurantsModel.find({ name : new RegExp(msg.value, 'i')})
    // .populate("restaurantId")
    .then(function(output) {
      if (output) {
        console.log("search by res name:", output)
        callback(null, output)  
      }
    });
  }

  if (msg.type === 'location'){
    // var condition =  { name : { [Op.like]: `%${value}%` } }
    Model.restaurantsModel.find({ location : new RegExp(msg.value, 'i')})
    // .populate("restaurantId")
    .then(function(output) {
      if (output) {
        console.log("search by location:", output)
        callback(null, output)  
      }
    });
  }

  Model.restaurantsModel.find({[msg.type] : new RegExp(msg.value, 'i')})
    // .populate("restaurantId")
    .then(function(output) {
      if (output) {
        console.log("search by cuisine or deliverymode:", output)
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