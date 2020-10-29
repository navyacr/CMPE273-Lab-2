const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dishSchema = new Schema({
   name: {type: String},
   ingredients: {type: String},
   decsription: {type: String},
   price: {type: String},
   category: {type: String},
   filename: {type: String}
})

var reviewSchema = new Schema({
   rating: {type: String},
   date: {type: Date, default: Date.now},
   description: {type: String},
   customerId: {type: ObjectId},
   customerName: {type: String}
})

var restaurantsSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    description: {type: String},
    contact: {type: String,},
    timings: {type: String,},
    location: {type: String, required: true}, 
    filename: {type: String,},
    cuisine: { type: String,},
    deliverymode: { type: String,},
    menu:[dishSchema],
    reviews: [reviewSchema]
 },
 {
    versionKey: false
 });

const restaurantsModel = mongoose.model('restaurants', restaurantsSchema);
const dishModel = mongoose.model('dishes', dishSchema);
const reviewModel = mongoose.model('reviews', reviewSchema);
module.exports = {
   dishModel: dishModel,
   restaurantsModel: restaurantsModel,
   reviewModel: reviewModel
};