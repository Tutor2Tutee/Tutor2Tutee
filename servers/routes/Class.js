const express = require('express')
const router = express.Router()

router.get('/',
    (req,res)=>{
    console.log('requested api/class')
})

router.post('/',  (req,res)=>{
    // res.send(req)
    console.log('posted api/class')
    res.status(200)
    res.send('great!!')
})

module.exports = router