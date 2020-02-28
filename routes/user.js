const express = require('express');
const router = express.Router();
const {loginFunc} = require('../utils/user');

router.post('/login', loginFunc);

module.exports = router;
