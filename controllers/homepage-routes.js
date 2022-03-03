const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Shoutout, Comment, Rating } = require("../models");


  router.get("/", (req, res) => {
    Shoutout.findAll({
      attributes: [
        "id",
        "user_id",
        "message",
        "photo",
        "video",
        "created_at",
        "updated_at",
        [sequelize.literal('(SELECT COUNT(*) FROM rating WHERE shoutout.id = rating.shoutout_id)'), 'rating_count'],
        [sequelize.literal('(SELECT AVG(rating) FROM rating WHERE shoutout.id = rating.shoutout_id)'), 'rating_average'],
      ],
      include: [
        {
          model: User,
          attributes: ["userFname", "userLname", "city", "state"],
        },
      ],
    })
        .then(data => {
          const shoutouts = data.map(shoutout => shoutout.get({ plain: true }));
          res.render('dashboard', { shoutouts });
        })
        .catch(err => {
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
