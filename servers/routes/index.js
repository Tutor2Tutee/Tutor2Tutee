const express = require('express');
const router = express.Router();

const _class = require('./Class')
const user = require('./User')

// 권한이 필요한곳에 적용!
const authMiddleWare = require('../middleware/auth')

router.use('/class',_class)
router.use('/user', user)



// /secret 에 get을 하려면 token이 필요함!
/*
router.use('/secret', authMiddleWare)
router.get('/secret', (req,res)=> {
    res.status(200).json({
        success : true,
        message : "success"
    })
})
 */



module.exports = router