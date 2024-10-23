'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        field:"firstName"
      },
      lastName: {
          type: Sequelize.STRING,
          allowNull: false,
          field:"lastName"
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        field:"username"
      },
      email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
          field:"email"
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false,
          field:"password"
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field:"createdAt"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field:"updatedAt"
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};