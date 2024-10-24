'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: "userId",
        as: "user"
      })
    }
  }
  Category.init({
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key:"id"
      }
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};