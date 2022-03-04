const router = require("express").Router();
const { User, Shoutout, Comments } = require("../../models");
const withAuth = require("../../utils/auth");


// Get All Users Endpoint - /api/users/
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "userFname", "userLname", "city", "state"],
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Get a Single User by id Endpoint - /api/users/:id
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: ["id", "userFname", "userLname", "city", "state"],
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Shoutout,
        attributes: ["id", "user_id", "message", "photo", "video"],
      },
    //   {
    //     model: Comments,
    //     attributes: ["id", "userId", "message"],
    //     include: {
    //       model: Shoutout,
    //       attributes: ["userId"],
    //     },
    //   },
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `Chit Chat did not find user id:${req.params.id}`});
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Create a Single New User Endpoint - POST /api/users/ 
  // BODY {"userFname": "", "userLname": "", "streetAddress": "", "city": "", "state": "", "zipCode": "", "userEmail": "", "userPassword": ""}
  //   {
  //   "userFname": "Laura",
  //   "userLname": "Chavez",
  //   "streetAddress": "1888 Downers Lane",
  //   "city": "Houston",
  //   "state": "TX",
  //   "zipCode": "77777",
  //   "userEmail": "lc@gmail.com",
  //   "userPassword": "p@ssword4"
  // }
  router.post("/", (req, res) => {
  User.create({
    userFname: req.body.userFname,
    userLname: req.body.userLname,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
<<<<<<< HEAD
    userEmail: req.body.userEmail,
    username: req.body.username,
    userPassword: req.body.userPassword,
=======
>>>>>>> 769fb6af7770ac8c67fb101d166511539d7e2aab
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `Chit Chat could not create your user account` });
        return;
      }
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Update a Single User Record by id Endpoint - PUT /api/users/:id
  // BODY can include one or more of the following: {"userFname": "", "userLname": "", "streetAddress": "", "city": "", "state": "", "zipCode": "", "userEmail": "", "userPassword": ""}
router.put("/:id", withAuth, (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `Chit Chat could not update the user information, because we did not find user id:${req.params.id}` });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Delete a Single User by id Endpoint - DELETE /api/users/:id
router.delete("/:id", withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `Chit Chat could not delete the record, because we did not find user id:${req.params.id}. Please try again.` });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Login Endpoint - POST /api/users/login
  // BODY {"userEmail": "", "userPassword": ""}
  router.post("/login", (req, res) => {
    User.findOne({
      where: {
        userEmail: req.body.userEmail,
      },
    }).then((data) => {
      if (!data) {
        res.status(400).json({ message: `Chit Chat did not find a user with that email address: ${req.body.userEmail}. Please try again.` });
        return;
      }
      const validPass = data.checkPassword(req.body.userPassword);
      if (!validPass) {
        res.status(400).json({ message: "The password is not valid. Please try again!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = data.id;
        req.session.userEmail = data.userEmail;
        req.session.username = data.username;
        req.session.loggedIn = true;
  
        res.json({message: "Welcome to Chit Chat. Give a shout out to the world!" });
      });
    });
  });


// Logout Endpoint - POST /api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
