const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  Post.findAll({
    attributes: [
      "id",
      "title",
      "post_content",
      "photo",
      "video",
      "rate",
      "created",
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count'],
      [sequelize.literal('(SELECT AVG(rate) FROM comment WHERE post.id = comment.post_id)'), 'rating_average'],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "user_id", "post_id","comment_text","photo","video","rate","created"],
        include: [
          {model: User,
            attributes: ["username"],
          },
        ],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
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

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "post_content",
      "photo",
      "video",
      "rate",
      "created",
      [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count'],
      [sequelize.literal('(SELECT AVG(rate) FROM comment WHERE post.id = comment.post_id)'), 'rating_average'],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "user_id", "post_id","comment_text","photo","video","rate","created"],
        include: [
          {model: User,
            attributes: ["username"],
          },
        ],
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
