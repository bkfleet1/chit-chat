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
          model: Comment,
          attributes: ["id", "user_id", "shoutout_id","message","photo","video", "created_at", "updated_at"],
          include: [
            {model: User,
              attributes: ["userFname", "userLname", "city", "state"],
            },
          ],
        },
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
        model: Comment,
        attributes: ["id", "user_id", "shoutout_id","message","photo","video", "created_at", "updated_at"],
        include: [
          {model: User,
            attributes: ["userFname", "userLname", "city", "state"],
          },
        ],
      },
      {
        model: User,
        attributes: ["userFname", "userLname", "city", "state"],
      },
    ],
  })
      .then(data => {
        const shoutout = data.get({ plain: true });
        res.render('single-post', { shoutout });
        // res.json(data);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


// router.get("/shoutout/:id", (req, res) => {
//   Shoutout.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: [
//       "id",
//       "user_id",
//       "message",
//       "photo",
//       "video",
//       "created_at",
//       "updated_at",
//       [sequelize.literal('(SELECT COUNT(*) FROM rating WHERE shoutout.id = rating.shoutout_id)'), 'rating_count'],
//       [sequelize.literal('(SELECT AVG(rating) FROM rating WHERE shoutout.id = rating.shoutout_id)'), 'rating_average'],
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "user_id", "shoutout_id","message","photo","video", "created_at", "updated_at"],
//         include: [
//           {model: User,
//             attributes: ["userFname", "userLname", "city", "state"],
//           },
//         ],
//       },
//       {
//         model: User,
//         attributes: ["userFname", "userLname", "city", "state"],
//       },
//     ],
//   })
//   .then(data => {
//     if (!data) {
//       res.status(404).json({ message: 'No post found with this id' });
//       return;
//     }

//     const post= data.get({ plain: true });

//     res.render('single-post', { post });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json(err);
//   });
// });

module.exports = router;
