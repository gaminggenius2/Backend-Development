const express = require('express');
const router = express.Router();

const usersRoutes = require('./userRoutes.js');
// const userCompletionController = require('../controllers/userCompletionController');
const challengeRoutes = require(`./challengeRoutes.js`)
router.use("/user", usersRoutes);
router.use("/challenge", challengeRoutes)
router.get("/", (req, res) => {
    res.send("API is running.");
});

module.exports = router;