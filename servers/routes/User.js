const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    console.log('requested api/user')
})

router.post('/', (req,res)=>{
    res.send(req)
    console.log('posted api/user')
})

module.exports = router