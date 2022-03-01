const router = require("express").Router();
const { User, Shoutout, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

//get/api/users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get/api/user
router.get("/:id", (req, res) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Shoutout,
        attributes: ["id", "userId", "message"],
      },
      {
        model: Comments,
        attributes: ["id", "userId", "message"],
        include: {
          model: Shoutout,
          attributes: ["userId"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//post api/users
router.post("/", (req, res) => {
  User.create({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.userName = dbUserData.userName;
      // {{#if logIn}} on login handlerbar
      req.session.logIn = true;
      res.json(dbUserData);
    });
  });
});

// Login
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      userEmail: req.body.userEmail,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    const validPass = dbUserData.checkPassword(req.body.userPassword);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    req.session.save(() => {
      // session variables
      req.session.userId = dbUserData.id;
      req.session.userName = dbUserData.userName;
       // {{#if logIn}} on login handlerbar
      req.session.logIn = true;

      res.json({ user: dbUserData, message: "You are in!" });
    });
  });
});

router.put("/:id", withAuth, (req, res) => {
  // update by its `id` value
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No data found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  // delete by its `id` value
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No data found with that id." });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.logIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
