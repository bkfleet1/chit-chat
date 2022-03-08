const { Post } = require("../models");

const postData = [

  {
    title: "The go-to weeknight dinner:",
    post_content: "Apple and peanutbutter",
    user_id: 3,
  },
  {
    title: "Places to Visit in Spain:",
    post_content: "Andalusia",
    user_id: 2,
  },
  {
    title: "Best places to visit in Andalusia",
    post_content:
      "Seville Cathedral,Discover the Alcazar de los Reyes Cristianos,The Albaicin neighborhood ",
    user_id: 1,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
