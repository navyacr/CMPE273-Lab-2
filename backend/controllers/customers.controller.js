const db = require("../models");
const customers = db.customers;
const Op = db.Sequelize.Op;
var kafka = require('../kafka/client');


exports.create = (req, res) => {
    kafka.make_request('cusPostInfoa',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err){
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      }else{
          console.log("Inside else");
              res.json({
                  updatedList:results
              });
  
              res.end();
          }
      
  });
  };

  exports.findProfile = (req, res) => {
    req.body._id = req.params.customerId
    kafka.make_request('cusGetInfo',req.body, function(err,results){
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
  };

  exports.allcustomers = (req, res) => {
    kafka.make_request('allcus',req.body, function(err,results){
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
  };
  
  exports.validate = (req, res) => {
    
    kafka.make_request('cusInfoValidate',req.body, function(err,results){
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

  }

  exports.update = (req, res) => {
    req.body._id = req.params.customerId
    kafka.make_request('cusPostInfoUpdatea',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      } 
      else {
          console.log("Inside else");
          res.json({
              updatedList:results
          });
  
          res.end();
      }
    });
  };

  exports.getChatRestaurants = (req, res) => {
    req.body.customerId = req.params.customerId
    kafka.make_request('getChatRestaurants',req.body, function(err,results){
      console.log('in result');
      console.log(results);
      if (err) {
          console.log("Inside err");
          res.json({
              status:"error",
              msg:"System Error, Try Again."
          })
      } 
      else {
          console.log("Inside else");
          res.json({
              updatedList:results
          });
  
          res.end();
      }
    });
  };