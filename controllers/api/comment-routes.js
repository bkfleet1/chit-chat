const router = require("express").Router();
const { Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");


// Get All Comments Endpoint - GET /api/comment/
router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "user_id", "shoutout_id","message","photo","video", "created_at", "updated_at"],
    include: [
      {model: User,
        attributes: ["userFname", "userLname", "city", "state"],
      },
    ],
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Get a Comment by id Endpoint - GET /api/comment/:id
router.get("/:id", (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "user_id", "shoutout_id","message","photo","video", "created_at", "updated_at"],
    include: [
      {model: User,
        attributes: ["userFname", "userLname", "city", "state"],
      },
    ],
  })
  .then((data) => {
    if (!data) {
      res.status(404).json({ message: `Chit Chat could not find the comment with id: ${req.params.id}.` });
      return;
    }
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


// Create a Comment Endpoint - POST /api/comment/ 
router.post("/", withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      user_id: req.session.user_id,
      shoutout_id: req.body.shoutout_id,
      message: req.body.message,
      photo: req.body.photo,
      video: req.body.video,
    })
    .then((data) => {
      if (!data) {
        res.status(400).json({ message: `Chit Chat could not create your comment. Please try again.` });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
  }
});


// Update a Comment by id Endpoint - PUT /api/comment/:id
router.put("/:id", withAuth, (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `Chit Chat could not update the record, because we did not find Shout Out id:${req.params.id}. Please try again.` });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete a Comment by id Endpoint - DELETE /api/comment/ 
router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
