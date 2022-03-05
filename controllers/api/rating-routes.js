const router = require("express").Router();
const { Rating, User } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

// Get All Ratings Endpoint - /api/users/
router.get("/", (req, res) => {
    Rating.findAll({
      attributes: ["id", "user_id", "shoutout_id", "rating", "created_at", "updated_at"],
    })
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  
  // Get a Rating by id Endpoint - /api/rating/:id
  router.get("/:id", (req, res) => {
    Rating.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "user_id", "shoutout_id", "rating", "created_at", "updated_at"],
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: `Chit Chat could not find the rating with id: ${req.params.id}.` });
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  
  // Create a Rating Endpoint - POST /api/rating/ 
  router.post("/", (req, res) => {
    Rating.create({
      user_id: req.session.user_id,
      shoutout_id: req.body.shoutout_id,
      rating: req.body.rating,
    })
    .then((data) => {
      if (!data) {
        res.status(404).json({ message: `Chit Chat could not create your rating. Please try again!` });
        return;
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
  
  
  // Update a Rating Endpoint - PUT /api/rating/ 
  router.put("/:id", withAuth, (req, res) => {
    Rating.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: `Chit Chat could not update the record, because we did not find rating id:${req.params.id}. Please try again.` });
          return;
        }
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  
  
  // Delete a Rating by id Endpoint - DELETE /api/rating/ 
  router.delete("/:id", withAuth, (req, res) => {
    Rating.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: `Chit Chat could not delete the record, because we did not find Rating id:${req.params.id}. Please try again.` });
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