const ordersModel = require('../models/orders.model');

function handle_request(msg, callback){
    // console.log("Orders for update:", msg)
    orders = msg.orders
    for (order of orders){
        // console.log(order)
        ordersModel.findByIdAndUpdate(order._id, {status: order.status}, { safe: true, new: true, useFindAndModify: false }, function(error, output) {
            // console.log("Error, output:", error, output)
        })

    }
    callback(null, {"status": "SUCCESS"})
    


    // ordersModel.findByIdAndUpdate({_id : msg._id }, msg, { safe: true, new: true, useFindAndModify: false }, function(error, order) {
    //     if (error) {
    //         callback(error, {"status": "error"})
    //     }
    //     if (order) {
    //         callback(null, order)
    //     }
    // });
    
}

exports.handle_request = handle_request;
