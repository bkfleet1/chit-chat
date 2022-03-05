const { User } = require("../models");

const data = [
  {
    userFname: "Martin",
    userLname: "Bour",
    userEmail: "martin_b@gmail.com",
    userPassword: "p@ssword1",
    streetAddress: "123 West Main Street",
    city: "New York",
    state: "NY",
    zipCode: "11111",
  },
  {
    userFname: "Mathew",
    userLname: "Benton",
    userEmail: "mathew_b@gmail.com",
    userPassword: "p@ssword2",
    streetAddress: "999 South River Lane",
    city: "Miami",
    state: "FL",
    zipCode: "99999",
  },
  {
    userFname: "Sandy",
    userLname: "Micheals",
    userEmail: "s_michaels@gmail.com",
    userPassword: "p@ssword3",
    streetAddress: "888 NW West Park",
    city: "New Orleans",
    state: "LA",
    zipCode: "88888",
  },
];

const seedUsers = () => User.bulkCreate(data);

module.exports = seedUsers;
