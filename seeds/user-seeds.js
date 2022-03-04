const { User } = require("../models");

const data = [
  {
    userFname: "Martin",
    userLname: "Bour",
    streetAddress: "123 West Main Street",
    city: "New York",
    state: "NY",
    zipCode: "11111",
    userEmail: "test@abc.com",
     username: "user1",
    userPassword: "password1",
  },
  {
    userFname: "Mathew",
    userLname: "Benton",
    streetAddress: "999 South River Lane",
    city: "Miami",
    state: "FL",
    zipCode: "99999",
    userEmail: "mathew_b@gmail.com",
     username: "user2",
    userPassword: "p@ssword2",
  },
  {
    userFname: "Sandy",
    userLname: "Micheals",
    streetAddress: "888 NW West Park",
    city: "New Orleans",
    state: "LA",
    zipCode: "88888",
    userEmail: "s_michaels@gmail.com",
     username: "user3",
    userPassword: "p@ssword3",
  },
];

const seedUsers = () => User.bulkCreate(data);

module.exports = seedUsers;
