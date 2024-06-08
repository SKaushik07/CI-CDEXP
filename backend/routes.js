const express = require('express');
const router = express.Router();
const userService = require('./services/userService');

/* user routes */
router.post('/users', userService.CreateUser);
router.get('/users', userService.GetAllUsers);
router.get('/users/:id', userService.GetUserById);
router.put('/users/:id', userService.UpdateUserById);
router.delete('/users/:id', userService.DeleteUserById);

module.exports = router;
