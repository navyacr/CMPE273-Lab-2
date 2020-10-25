module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Mysore123",
    DB: "yelp",
    dialect: "mysql",
    pool: {
      max: 100,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };


//   const config = {
//     secret: "cmpe273_secret_key",
//     frontendURL: "http://localhost:3000",
//     mongoDB: 'mongodb+srv://navya:Mys123@yelp.swslq.mongodb.net/yelp_app?retryWrites=true&w=majority'
    
// };

// module.exports = config;