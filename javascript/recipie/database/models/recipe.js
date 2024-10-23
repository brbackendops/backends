'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Steps,{
        foreignKey: 'recipeId',
        onDelete: 'CASCADE'
      });
      
      this.hasMany(models.Ingredients,{
        foreignKey: "recipeId",
        onDelete: 'CASCADE'
      });    
      
      this.belongsTo(models.User,{
        foreignKey: "id"
      })
    }
  }
  Recipe.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};