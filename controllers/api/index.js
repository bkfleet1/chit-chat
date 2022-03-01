const router = require('express').Router();

const userEndPoints = require('./user-routes.js');
const shoutoutEndPoints = require('./shoutout-routes.js');

router.use('/users', userEndPoints);
router.use('/shoutouts', shoutoutEndPoints);

module.exports = router;
