const router = require("express").Router();


const apiEndPoints = require("./api/");
const homepageEndPoints = require("./homepage-routes.js");
const userMainEndPoints = require("./main-routes.js");

router.use("/api", apiEndPoints);
router.use("/", homepageEndPoints);
router.use("/main", userMainEndPoints);

router.use((req, res) => {
  res.send("Invalid endpoint");
});

module.exports = router;
