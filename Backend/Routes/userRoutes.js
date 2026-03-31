const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

router.post('/',userController.createuser ) //Q1
router.put('/:id', userController.updateUser)
router.get('/', userController.getAllUsers)
router.delete('/:id', userController.deleteuser)
module.exports = router;