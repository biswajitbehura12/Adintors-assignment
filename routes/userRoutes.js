const express = require('express')
const router = express.Router()
//const auth = require('../middleWare/auth.js');

const {
    registerUser,
    loginUser,
} = require('../controllers/userControl')

router.post('/register', registerUser)

router.post('/login', loginUser);

module.exports = router;