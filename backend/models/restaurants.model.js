module.exports = (sequelize, Sequelize) => {
    const restaurants = sequelize.define("restaurants", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      }
    });
  
    return restaurants;
  };