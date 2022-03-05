const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    shoutout_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shoutout',
        key: 'id'
      }
    },
    rating: {
        type: DataTypes.INTEGER(1),
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'rating'
  }
);

module.exports = Rating;