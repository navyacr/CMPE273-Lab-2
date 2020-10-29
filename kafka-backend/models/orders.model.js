const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ordersSchema = new Schema({
    customerId: {type: ObjectId},
    restaurantId: {type: ObjectId},
    dishId: {type: ObjectId},
    qty: { type: String},
    dm: { type: String},
    status: { type: String},
},
{
    versionKey: false
});

const ordersModel = mongoose.model('orders', ordersSchema);
module.exports = ordersModel;