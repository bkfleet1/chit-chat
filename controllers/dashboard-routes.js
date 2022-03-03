const router = require("express").Router();
const sequelize = require("../config/connection");
const { Shoutout, User, Comment, Rating } = require("../models");
const withAuth = require("../utils/auth");

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


// router.get("/", withAuth, (req, res) => {
//   Shoutout
//     .findAll({
//       where: {
//         // use the ID from the session
//         user_id: req.session.user_id,
//       },
//       attributes: ["id", "user_id", "message"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "user_id", "shoutout_id", "message"],
//           include: {
//             model: User,
//             attributes: ["id","userFname", "userLname", "city", "state"],
//           },
//         },
//         {
//           model: User,
//           attributes: ["id"],
//         },
//       ],
//     })
//     .then(dbPostData => {
//       const posts = dbPostData.map(post => post.get({ plain: true }));
//       res.render('dashboard', { posts, loggedIn: true });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/edit/:id", withAuth, (req, res) => {
  Shoutout
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
            attributes: ["id"],
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
