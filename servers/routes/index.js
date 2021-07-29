const express = require('express');
const router = express.Router();

const _class = require('./Class')
const user = require('./User')

router.use('/classes', _class)
router.use('/users', user)


module.exports = router