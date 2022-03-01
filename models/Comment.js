const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Comment extends Model {}

Comment.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    shoutout_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
   
    message: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    photo: {
        type: DataTypes.BLOB,
        allowNull: true
      },
      video: {
        type: DataTypes.BLOB,
        allowNull: true
      },
},
   {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
   }
  );

module.exports = Comment;
