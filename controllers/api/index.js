const router = require('express').Router();

const userEndPoints = require('./user-routes.js');
const shoutoutEndPoints = require('./shoutout-routes.js');
const commentEndPoints = require('./comment-routes.js');

router.use('/users', userEndPoints);
router.use('/shoutouts', shoutoutEndPoints);
router.use('/comments', commentEndPoints);

module.exports = router;
