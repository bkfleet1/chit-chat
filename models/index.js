// import models
const User = require("./User");
const Shoutout = require("./Shoutout");
const Comment = require("./Comment");
const Rating = require("./Rating");

User.hasMany(Shoutout, {
  foreignKey: 'user_id'
});

Shoutout.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

User.belongsToMany(Shoutout, {
  through: Rating,
  as: 'voted_posts',

  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Shoutout.belongsToMany(User, {
  through: Rating,
  as: 'voted_posts',
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Rating.belongsTo(Shoutout, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Rating, {
  foreignKey: 'user_id'
});

Shoutout.hasMany(Rating, {
  foreignKey: 'post_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Shoutout, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Shoutout.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = {
  User,
  Shoutout,
  Comment,
  Rating
};
