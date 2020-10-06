const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const trend = require('./controllers');

router.get('/uri',trend.getAutherizationURI);
router.post('/getoauth',trend.getAutherizationToken);
router.post('/user',trend.getUserInfo);
// router.post('/recruit',trend.employeeFilter);

module.exports = router;