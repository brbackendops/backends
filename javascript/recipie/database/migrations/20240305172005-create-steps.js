'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Steps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Recipes",
          key:"id"
        },
        allowNull: false,
        field: 'recipeId'
      },
      stepNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        field: 'stepNumber'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'title'
      },
      instruction: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'instruction'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field: 'createdAt'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field: 'updatedAt'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Steps');
  }
};