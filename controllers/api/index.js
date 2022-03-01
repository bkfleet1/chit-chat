const router = require('express').Router();

const userEndPoints = require('./user-routes.js');

router.use('/users', userEndPoints);


module.exports = router;
