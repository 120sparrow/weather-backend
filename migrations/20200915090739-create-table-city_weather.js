const { CITY_WEATHER } = require(`../helpers/enums`);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(CITY_WEATHER, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      temperature: {
        type: Sequelize.REAL,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: queryInterface => queryInterface.dropTable(CITY_WEATHER),
};