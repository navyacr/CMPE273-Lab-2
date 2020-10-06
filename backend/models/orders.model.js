module.exports = (sequelize, Sequelize) => {

    const orders = sequelize.define("orders", {
      qty: {
        type: Sequelize.INTEGER
      }
    });   

    return orders;
  };

  