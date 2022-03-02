const router = require("express").Router();

const userEndPoints = require("./user-routes.js");
const shoutoutEndPoints = require("./shoutout-routes.js");
const commentEndPoints = require("./comment-routes.js");
const ratingEndPoints = require("./rating-routes.js");

router.use("/users", userEndPoints);
router.use("/shoutouts", shoutoutEndPoints);
router.use("/comments", commentEndPoints);
router.use("/ratings", ratingEndPoints);

module.exports = router;
