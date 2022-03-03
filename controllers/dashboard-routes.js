const router = require("express").Router();
const sequelize = require("../config/connection");
const { shoutout, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
  shoutout
    .findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      attributes: ["id", "user_id", "message"],
      include: [
        {
          model: Comment,
          attributes: ["id", "user_id", "message"],
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
      // serialize data before passing to template
      const shoutout = dbshoutoutData.map((shoutout) =>
        shoutout.get({ plain: true })
      );
      res.render("main", { shoutout, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  shoutout
    .findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "message"],
      include: [
        {
          model: Comment,
          attributes: ["id", "user_id", "shoutout_id", "message"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    })
    .then((dbshoutoutData) => {
      if (!dbshoutoutData) {
        res.status(404).json({ message: "No shout with this id" });
        return;
      }

      // serialize the data
      const shoutout = dbshoutoutData.get({ plain: true });

      res.render("edit-shoutout", {
        shoutout,
        loggedIn: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/add/", withAuth, (req, res) => {
  shoutout
    .findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      attributes: ["id", "message"],
      include: [
        {
          model: Comment,
          attributes: ["id", "user_id", "shoutout_id", "message"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    })
    .then((dbshoutoutData) => {
      const shoutout = dbshoutoutData.map((shoutout) =>
        shoutout.get({ plain: true })
      );
      res.render("add-shout", { shoutout, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
