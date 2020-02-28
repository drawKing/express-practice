const express = require('express');
const router = express.Router();
const {getListFunc, addListFunc, putDeatilFunc, getDetailFunc, delDetailFunc} = require('../utils/blog');

router.get('/list', getListFunc);
router.post('/list', addListFunc);
router.put('/list', putDeatilFunc);
router.get('/list/detail', getDetailFunc);
router.delete('/list/detail/:id', delDetailFunc);

module.exports = router;
