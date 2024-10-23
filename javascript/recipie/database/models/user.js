'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Recipe,{
        onDelete: "CASCADE",
        foreignKey: "userId"
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: generateUsernamePassword,
    }
  });

  return User;
};

const generateUsernamePassword = async(user) => {
    const username = user.firstName + " " + user.lastName;
    const hashPassword = bcrypt.hashSync(user.password,10);
    user.username = username;
    user.password = hashPassword;
}