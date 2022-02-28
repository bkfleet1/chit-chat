const { User } = require("../models");

const userData = [
  {
    userName: "martin_bour",
    userEmail: "martin_b@gmail.com",
    userPassword: "p@ssword1",
  },
  {
    userName: "matt_b",
    userEmail: "mathew_b@gmail.com",
    userPassword: "p@ssword2",
  },
  {
    userName: "shaun_c",
    userEmail: "shaun_c@gmail.com",
    userPassword: "p@ssword3",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
