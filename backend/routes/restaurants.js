const express = require("express");
const app = express.Router();

const restaurants = require("../controllers/restaurants.controller.js");
const dishes = require("../controllers/dishes.controller.js");

app.get("/", (req, res) => res.send("Hello World !"));

//Route to handle Post Request Call
app.post('/info', restaurants.create)

app.get('/info', restaurants.findAll)

//Route to get restaurants by name
app.get('/info/:name', restaurants.findByName)

app.post('/create', function(req, res){
    console.log("Inside createBook")
    console.log(req.body)
    books.push(req.body)
    console.log(books)
    res.redirect('/home');
    res.end(JSON.stringify({ success: "book id: "+ req.bosy.BookID+" added successfully!!!", error: "" }));

})

app.get('/:restaurantName/dishes', dishes.findAll)
// app.get('/:restaurantName/dishes/:dishName', dishes.findByName)


module.exports = app;
