const express = require("express");
const app = express.Router();

const restaurants = require("../controllers/restaurants.controller.js");


app.get("/", (req, res) => res.send("Hello World !"));

//Route to handle Post Request Call
app.post('/info', restaurants.create)

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})
app.post('/create', function(req, res){
    console.log("Inside createBook")
    console.log(req.body)
    books.push(req.body)
    console.log(books)
    res.redirect('/home');
    res.end(JSON.stringify({ success: "book id: "+ req.bosy.BookID+" added successfully!!!", error: "" }));

})


module.exports = app;
