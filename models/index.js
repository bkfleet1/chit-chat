// import models
const User = require("./User");
// const LoginHistory = require("./LoginHistory");
const Comment = require("./Comments");
const Shoutout = require("./Shoutout");

// LoginHistory belongsTo User
// login.belongsTo(user, {
//   foreignKey: "userId",
// });

// Shoutout belongsTo User
Shoutout.belongsTo(User, {
  foreignKey: "userId",
});

// Shoutout have many Comments
Shoutout.hasMany(Comment, {
  foreignKey: "shoutoutId",
});

// Comments belongTo Shoutout
Comment.belongsTo(Shoutout, {
  foreignKey: "shoutoutId",
});

// Comments belongTo User
Comment.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  User,
  // login,
  Comment,
  Shoutout,
};
