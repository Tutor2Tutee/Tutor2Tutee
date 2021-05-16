const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const Class = require('../schemas/classSchema')

router.get('/',
    (req,res)=>{
    console.log('requested api/class')
    Class.find()
        .then(data => {
            res.status(200)
            res.send(data)
            console.log(data)
        })
        .catch(err => {
            res.status(500)
            console.log(err)
        })
})

router.post('/',  (req,res)=>{
    // res.send(req)
    console.log('posted api/class')
    res.status(200)
    res.send('great!!')
})

module.exports = router