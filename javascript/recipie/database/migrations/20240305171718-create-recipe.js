'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        field:'title'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        field:'description'
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
        field:'image'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field:'createdAt'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field:'updatedAt'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Recipes');
  }
};