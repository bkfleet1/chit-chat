const { Comment } = require("../models");

const data = [
  {
    user_id: 1,
    shoutout_id: 2,
    message: "This is amazing!",
  },
  {
    user_id: 2,
    shoutout_id: 1,
    message: "Wow, amazing work!",
  },
  {
    user_id: 1,
    shoutout_id: 3,
    message: "Awesome! kudos to everyone who have contributed",
  },
];

const seedComments = () => Comment.bulkCreate(data);

module.exports = seedComments;
