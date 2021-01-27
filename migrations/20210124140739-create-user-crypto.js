'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserCryptos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserCryptos')
  },
}
