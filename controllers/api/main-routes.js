const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Shoutout, Comment } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);

  Shoutout.findAll({
    attributes: ["id", "userId", "message"],
    include: [
      {
        model: Comment,
        attributes: ["id", "userId", "shoutoutId", "message"],
        include: {
          model: User,
          attributes: ["userFname","userLname"],
        },
      },
      // {
      //   model: User,
      //   attributes: ["username"],
      // },
    ],
  })
    .then((dbPostData) => {
      const shoutout = dbPostData.map((Shoutout) =>
        Shoutout.get({ plain: true })
      );
      res.render("homepage", {
        shoutout,
        logIn: req.session.logIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.logIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/post/:id", (req, res) => {
  Shoutout.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "userId", "message"],
    include: [
      {
        model: Comment,
        attributes: ["id", "userId", "shoutoutId", "message"],
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
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "Nothing found in this id" });
        return;
      }

      // serialize the data
      const shoutout = dbPostData.get({ plain: true });

      // pass data to template
      res.render("single-post", {
        shoutout,
        logIn: req.session.logIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
