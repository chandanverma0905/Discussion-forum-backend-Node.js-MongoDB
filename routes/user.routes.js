const express = require('express');
const {registerUser, getAllUsers, getUserByUserName} = require("../controllers/user.controller.js");
const {validateApiKey} = require("../middlewares/auth.middleware.js");

const router = express.Router();


router.post('/register', registerUser);
router.get('/all', validateApiKey, getAllUsers);
router.get('/:username', getUserByUserName);


module.exports = router;