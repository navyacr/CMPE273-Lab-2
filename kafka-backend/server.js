var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var RestaurantsInfoCreate = require('./services/restaurantsInfoCreate.js');
var Customers = require("./services/customers.js")
var CustomersInfoUpdate = require("./services/customersInfoUpdate.js")
var CustomersGetInfo = require("./services/customersGetInfo.js")
var RestaurantsInfoUpdate = require("./services/restaurantsInfoUpdate.js")
var RestaurantsGetInfo = require("./services/restaurantsGetInfo.js")
var RestaurantsMenuUpdate = require("./services/restaurantsMenuUpdate.js")
var CustomersPostReview = require("./services/customersPostReview.js")
var CustomersOrderCreate = require("./services/customersOrderCreate.js")

const mongoose = require('mongoose');

const { mongoDB, frontendURL } = require('../backend/config/mongo.config');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log("Message is:", message.value)
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("resPostInfo",RestaurantsInfoCreate)
handleTopicRequest("cusPostInfoa", Customers)
handleTopicRequest("cusPostInfoUpdatea", CustomersInfoUpdate)
handleTopicRequest("cusGetInfo", CustomersGetInfo)
handleTopicRequest("resUpdateInfo", RestaurantsInfoUpdate)
handleTopicRequest("resGetInfo", RestaurantsGetInfo)
handleTopicRequest("resCreateDish", RestaurantsMenuUpdate)
handleTopicRequest("cusPostReview", CustomersPostReview)
handleTopicRequest("cusOrderCreate", CustomersOrderCreate)



