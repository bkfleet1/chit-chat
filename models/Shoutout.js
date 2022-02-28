const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Shoutout extends Model {}

Shoutout.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    message: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    photo: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    video: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "shout",
  }
);

module.exports = Shoutout;
