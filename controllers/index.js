const router = require("express").Router();

const uiEndPoints = require("./ui.js");
const apiEndPoints = require("./api/");
const cbEndPoints = require("./cb.js");
const homepageEndPoints = require("./homepage-routes.js");
const userMainEndPoints = require("./dashboard-routes.js");

router.use("/", uiEndPoints);
router.use("/api", apiEndPoints);
router.use("/cb", cbEndPoints);
router.use("/", homepageEndPoints);
router.use("/dashboard", userMainEndPoints);

router.use((req, res) => {
  res.send("Invalid endpoint");
});

module.exports = router;
