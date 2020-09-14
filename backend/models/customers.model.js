module.exports = (sequelize, Sequelize) => {
    const customers = sequelize.define("customers", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.DATETIME
      }
    });
  
    return customers;
  };