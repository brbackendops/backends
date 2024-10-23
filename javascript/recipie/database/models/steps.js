'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Steps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Recipe,{
        foreignKey: "id"
      });
      this.hasMany(models.Ingredients,{
        onDelete: "CASCADE",
        foreignKey: "stepId"
      })
    }
  }
  Steps.init({
    recipeId: DataTypes.INTEGER,
    stepNumber: DataTypes.INTEGER,
    title: DataTypes.STRING,
    instruction: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Steps',
  });
  return Steps;
};