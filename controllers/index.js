const router = require('express').Router();

const apiEndPoints = require('./api/');

router.use('/api', apiEndPoints);

router.use((req, res) => {
  res.send("Invalid endpoint")
});

module.exports = router;