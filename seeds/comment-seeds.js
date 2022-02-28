const { Comment } = require("../models");

const commentData = [
  {
    userId: 1,
    shoutoutId: 5,
    message: "This is amazing!",
  },
  {
    userId: 4,
    shoutoutId: 4,
    message: "Wow, amazing work!",
  },
  {
    userId: 1,
    shoutoutId: 4,
    message: "Awesome! kudos to everyone who have contributed",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;