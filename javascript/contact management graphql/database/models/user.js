'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: "https://media.licdn.com/dms/image/C4D03AQFbbTtdG8B38w/profile-displayphoto-shrink_800_800/0/1636147280355?e=2147483647&v=beta&t=tVZ-31qeiMfoxBKTRh5v2lkZU_hP_Ae-Hoft52L8M2Q"
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.sync()
  return User;
};