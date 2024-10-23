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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING,
        defaultValue: "https://media.licdn.com/dms/image/C4D03AQFbbTtdG8B38w/profile-displayphoto-shrink_800_800/0/1636147280355?e=2147483647&v=beta&t=tVZ-31qeiMfoxBKTRh5v2lkZU_hP_Ae-Hoft52L8M2Q"
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
    await queryInterface.dropTable('Users');
  }
};