const router = require('express').Router();

const uiEndPoints = require('./ui.js');
const apiEndPoints = require('./api/');
const cbEndPoints = require('./cb.js');

router.use('/', uiEndPoints);
router.use('/api', apiEndPoints);
router.use('/cb', cbEndPoints);

router.use((req, res) => {
  res.send("Invalid endpoint")
});

module.exports = router;