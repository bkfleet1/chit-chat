const { User } = require("../models");

const userData = [
  {
    username: "user1",
    fName: "fName",
    lName: "lName",
    email: "test@cbc.com",
    password: "pas1",
  },
  {
    username: "user2",
    fName: "fName",
    lName: "lName",
    email: "test1@cbc.com",
    password: "pas2",
  },
  {
    username: "user3",
    fName: "fName",
    lName: "fName",
    email: "test2@cbc.com",
    password: "pas3",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
