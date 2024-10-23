'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId:{
        type: DataTypes.INTEGER,
        references: {
            model: "Users",
            key:"id"
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "UNCATEGORIZED"
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Date.now
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};