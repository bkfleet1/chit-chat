// import models
const user = require("./User");
const login = require("./LoginHistory");
const comment = require("./Comments");
const shoutout = require("./Shoutout");

// LoginHistory belongsTo User
login.belongsTo(user, {
  foreignKey: "userId",
});

// Shoutout belongsTo User
shoutout.belongsTo(user, {
  foreignKey: "userId",
});

// Shoutout have many Comments
shoutout.hasMany(comment, {
  foreignKey: "shoutoutId",
});

// Comments belongTo Shoutout
comment.belongsTo(shoutout, {
  foreignKey: "shoutoutId",
});

// Comments belongTo User
comment.belongsTo(user, {
  foreignKey: "userId",
});

module.exports = {
  user,
  login,
  comment,
  shoutout,
};
