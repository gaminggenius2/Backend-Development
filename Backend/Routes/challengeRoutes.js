const express = require('express');
const router = express.Router();

const challengeController = require('../Controllers/challengeController');

router.post('/', challengeController.createchallenge)
router.put('/:challenge_id', challengeController.editchallenge)
router.get('/' , challengeController.getallchallenges)
router.delete('/:challenge_id', challengeController.deletechallenge)
module.exports = router;