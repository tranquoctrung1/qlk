const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');

router.get('/GetUsers', UserController.GetUsers);

router.post('/InsertUser', UserController.InsertUser);

router.patch('/UpdateUser', UserController.UpdateUser);

router.delete('/DeleteUser', UserController.DeleteUser);

module.exports = router;
