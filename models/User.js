const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPass) {
    return bcrypt.compareSync(loginPass, this.userPassword);
  }
}


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
    userLname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    userPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
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
  },
  {
    hooks: {
      async beforeCreate(data) {
        data.userPassword = await bcrypt.hash(data.userPassword, 12);
        return data;
      },

      async beforeUpdate(data) {
        data.userPassword = await bcrypt.hash(data.userPassword, 12);
        return data;
      }
    },

    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
