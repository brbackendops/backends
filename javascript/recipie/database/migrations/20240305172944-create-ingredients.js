'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stepId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Steps",
          key: "id"
        },
        field: 'stepId'
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Recipes",
          key: "id"
        },
        field: 'recipeId'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'title'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'createdAt'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updatedAt'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ingredients');
  }
};