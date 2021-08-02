const express = require('express');
const router = express.Router();

const _class = require('./Class')
const user = require('./User')
const _quiz = require('./Quiz')

router.use('/class', _class)
router.use('/user', user)
router.use('/quiz', _quiz)


module.exports = router