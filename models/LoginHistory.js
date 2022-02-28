const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class LoginHistory extends Model {}

LoginHistory.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
   
    loginDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
},
   {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'login',
   }
  );

module.exports = LoginHistory;
