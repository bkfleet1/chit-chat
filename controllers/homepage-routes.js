const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Shoutout, Comment } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);

  Shoutout.findAll({
    attributes: ["id", "user_id", "message"],
    include: [
      {
        model: Comment,
        attributes: ["id", "user_id", "shoutout_id", "message"],
        include: {
          model: User,
          attributes: ["userFname", "userLname"],
        },
      },
       {
        model: User,
         attributes: ["username"],
       },
    ],
  })
    .then((dbshoutoutData) => {
      const shoutout = dbshoutoutData.map((Shoutout) =>
        Shoutout.get({ plain: true })
      );
      res.render("homepage", {
        shoutout,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/shoutout/:id", (req, res) => {
  Shoutout.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "user_id", "message"],
    include: [
      {
        model: Comment,
        attributes: ["id", "user_id", "shoutout_id", "message"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbshoutoutData) => {
      if (!dbshoutoutData) {
        res.status(404).json({ message: "Nothing found in this id" });
        return;
      }

      // serialize the data
      const shoutout = dbshoutoutData.get({ plain: true });

      // pass data to template
      res.render("single-shoutout", {
        shoutout,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
