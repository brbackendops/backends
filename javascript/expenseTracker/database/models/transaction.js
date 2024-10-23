'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
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
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },    
    date: {
      type: DataTypes.DATE,
      defaultValue: Date.now
    },    
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};