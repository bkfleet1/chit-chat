const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class User extends Model {}

User.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userFname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userLname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    zipCode: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userPassword: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {},
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "cred",
  }
);

module.exports = User;