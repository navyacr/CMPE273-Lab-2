const db = require("../models");
const restaurants = db.restaurants;
const restaurantsProfile = db.restaurantsProfile;
const Op = db.Sequelize.Op;
const passwordHash = require('password-hash');
var kafka = require('../kafka/client');


exports.create = (req, res) => {

  kafka.make_request('resPostInfo',req.body, function(err,results){

    if (err){
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
            res.json({
                updatedList:results
            });

            res.end();
        }    
  });
   
};

exports.createReview = (req, res) => {
  req.body.customerId = req.params.customerId
  kafka.make_request('cusPostReview',req.body, function(err,results){

    if (err){
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
            res.json({
                updatedList:results
            });

            res.end();
        }    
  });
  
};

exports.aggReview = (req, res) => {
  req.body.restaurantId = req.params.restaurantId
  kafka.make_request('resAggReview',req.body, function(err,results){

    if (err){
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
            res.json({
                updatedList:results
            });

            res.end();
        }    
  });

  // const restaurantId = req.params.restaurantId;
  // // var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
  // var condition = restaurantId ? { restaurantId: { [Op.eq]: `${restaurantId}` } } : null;
  // reviews.findAll({
  //   where: condition,
  //   attributes: [[Sequelize.fn('count', Sequelize.col('rating')), 'count'],[Sequelize.fn('sum', Sequelize.col('rating')), 'total']],
  // }).then(data => {
  //         res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //         message:
  //         err.message || "Some error occurred while retrieving orders."
  //     });
  //   })
  
};

  exports.findById = (req, res) => {
    req.body._id = req.params.restaurantId
    kafka.make_request('resGetInfo',req.body, function(err,results){

      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
              res.json({
                  updatedList:results
              });
  
              res.end();
          }    
    });
    
  };
  exports.createOrUpdateDish = (req, res) => {
    req.body.name = req.params.dishName
    kafka.make_request('resCreateDisha',req.body, function(err,results){

      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
              res.json({
                  updatedList:results
              });
  
              res.end();
          }    
    });
    
  };
  

  exports.findAll = (req, res) => {

    kafka.make_request('resGetAll',req.body, function(err,results){

      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
              res.json({
                  updatedList:results
              });
  
              res.end();
          }    
    });
    

    // restaurantsProfile.findAll({
    //   where: {},
    //   include: [{
    //       model: restaurants,
    //       where: {}
    //   }]
    // }).then((data) => {
    //       res.send(data)
    //       console.log("*********************\n\n\n\n\n",data);
    // });
  };

  exports.validate = (req, res) => {

    kafka.make_request('resInfoValidate',req.body, function(err,results){
      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else {
        res.json({
            updatedList:results
        });
        res.end();
      }
    });
    // const username = req.body.username;
    
    // const pwd = req.body.password;
    // var condition = username ? { email: { [Op.eq]: `${username}` } } : null;
  
    // restaurants.findOne({ where: condition })
    //   .then(data => {
    //     if (!data) {
    //       res.status(401).send({
    //         message: "INVALID_CREDENTIALS"
    //       });
    //     }
    //     else if (passwordHash.verify(pwd, data.dataValues.password)){
    //       message = {message: "SUCCESS"}
    //       returnVal = Object.assign(message, data.dataValues)
    //       res.status(200).send(returnVal)
    //     }
    //     else{
    //       res.status(401).send({
    //         message: "INVALID_CREDENTIALS"
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while logging in."
    //     });
    //   });
  };

  exports.update = (req, res) => {
    req.body._id = req.params.restaurantId
    kafka.make_request('resUpdateInfo',req.body, function(err,results){

      if (err){
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
              res.json({
                  updatedList:results
              });
  
              res.end();
          }    
    });
    // const id = req.params.restaurantId;
    // var condition = id ? { id: { [Op.eq]: `${id}` } } : null;
    // const newDetails = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // };

    // restaurants.update(newDetails, { where: condition })
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while updating restaurants."
    //     });
    //   });
  };