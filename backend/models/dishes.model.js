module.exports = (sequelize, Sequelize) => {
    const dishes = sequelize.define("dishes", {
      name: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      category:{
        type: Sequelize.STRING
      }
    });
    

    return dishes;
  };

  