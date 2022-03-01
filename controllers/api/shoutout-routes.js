const router = require("express").Router();
const { User, Comment, Shoutout } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");



// Get All Shout Outs Endpoint - /api/users/
router.get("/", (req, res) => {
  Shoutout.findAll({
    attributes: ["id", "user_id", "message", "created_at", "updated_at"],
    include: [
      {
        model: User,
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


// Get a Single Shout Out by id Endpoint - /api/shoutout/:id
router.get("/:id", (req, res) => {
  Shoutout.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "user_id", "message", "created_at", "updated_at"],
    include: [
      {
        model: User,
        attributes: ["userFname", "userLname", "city", "state"],
      }
    ],
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `Chit Chat could not find a Shout Out with id: ${req.params.id}.` });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// Create a Single New Shout Out Endpoint - POST /api/shoutout/ 
// {
// 	"user_id": 4,
// 	"message": "Beautiful day here in h-town. Enjoying time with my family and dogs. Living the dream!"
// }



router.post("/", withAuth, (req, res) => {
  Shoutout.create({
    user_id: req.session.user_id,
    message: req.body.message,
    photo: req.body.photo,
    video: req.body.video
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



// Update a Single Shout Out Endpoint - PUT /api/shoutout/ 
router.put("/:id", withAuth, (req, res) => {
  Shoutout.update(req.body, {
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



// Delete a Shout Out by id Endpoint - DELETE /api/shoutout/ 
router.delete("/:id", withAuth, (req, res) => {
  Shoutout.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `Chit Chat could not delete the record, because we did not find Shout Out id:${req.params.id}. Please try again.` });
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
