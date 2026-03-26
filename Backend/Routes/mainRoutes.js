const express = require('express');
const router = express.Router();

// const userCompletionController = require('../controllers/userCompletionController');
// const userController = require('../controllers/userController');
// router.use("/", usersRoutes);
router.get("/", (req, res) => {
    res.send("API is running.");
});

module.exports = router;