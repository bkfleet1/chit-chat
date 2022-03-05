const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 3,
    comment_text: "Nice!",
    photo: "",
    video: "",
  },
  {
    user_id: 3,
    post_id: 3,
    comment_text: "Humm!",
    photo: "",
    video: "",
    
  },
  {
    user_id: 3,
    post_id: 2,
    comment_text: "Thankfully!",
    photo: "",
    video: "",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
