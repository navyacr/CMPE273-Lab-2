const db = require("../models");
const customers = db.customers;
const Op = db.Sequelize.Op;
var kafka = require('../kafka/client');

// exports.findOne = (req, res) => {
//   var customerId = req.params.customerId
//   var condition = customerId ? { id: { [Op.eq]: `${customerId}` } } : null;
//   customers.findOne({where: condition})
//         .then(data => {
//           res.send(data)
//         })
//         .catch(err => {
//           res.status(500).send({
//             message:
//               err.message || "Some error occurred while creating the customerProfile."
//           });
//         });
//     }

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
  
  // exports.validate = (req, res) => {
  //   const username = req.body.username;
  //   const pwd = req.body.password;
  //   var condition = username ? { email: { [Op.eq]: `${username}` } } : null;
  
  //   customers.findOne({ where: condition })
  //     .then(data => {
  //       if (!data) {
  //         res.status(401).send({
  //           message: "INVALID_CREDENTIALS"
  //         });
  //       }
  //       else if (data.dataValues.password === pwd){
  //         message = {message: "SUCCESS"}
  //         returnVal = Object.assign(message, data.dataValues)
  //         res.status(200).send(returnVal)
  //       }
  //       else{
  //         res.status(401).send({
  //           message: "INVALID_CREDENTIALS"
  //         });
  //       }
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while logging in."
  //       });
  //     });
  // };

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
    // const id = req.params.customerId;
    // var condition = id ? { id: { [Op.eq]: `${id}` } } : null;
    // const newDetails = {
    //   name: req.body.name,
    //   email: req.body.email,
    //   password: req.body.password,
    // };

    // customers.update(newDetails, { where: condition })
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