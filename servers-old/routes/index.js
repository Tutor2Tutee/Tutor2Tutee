const express = require('express');
const router = express.Router();

const _class = require('./Class')
const user = require('./User')
const _quiz = require('./Quiz')

router.use('/classes', _class)
router.use('/users', user)
router.use('/quiz', _quiz)

module.exports = router