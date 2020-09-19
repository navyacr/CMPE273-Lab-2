const app = require('./app');
// Router variables 
var restaurantsRouter = require("./routes/restaurants");
app.use("/restaurants", restaurantsRouter);

var customersRouter = require("./routes/customers");
app.use("/customers", customersRouter);

var eventsRouter = require("./routes/events");
app.use("/events", eventsRouter);



//start your server on port 3001
module.exports = app;
app.listen(3001);
console.log("Server Listening on port 3001");

const db = require("./models");
// TODO: Remove force: true and change to sync() in production
// force: true drops table and resyncs db 
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});