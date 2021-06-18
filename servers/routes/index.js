const express = require('express');
const router = express.Router();

const _class = require('./Class')
const user = require('./User')

router.use('/class', _class)
router.use('/user', user)


module.exports = router