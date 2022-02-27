const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class User extends Model {}

User.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  
  user_password: {
    type: DataTypes.INTEGER,
    allowNull: false
   
  },

  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    }
  }
},
   {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cred',
   }
  );

module.exports = User;
