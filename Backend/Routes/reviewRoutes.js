const express = require('express');
const router = express.Router();

const reviewcontroller = require('../Controllers/ReviewController');

router.post('/', reviewcontroller.createreview)
router.delete('/',reviewcontroller.deletereview)


module.exports = router;