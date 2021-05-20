const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

const User = require('../models/userSchema')
const authMiddleWare = require('../middleware/auth')

// 로그인
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // 각 항목이 비었는지 확인
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'email is empty'
        })
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'password is empty'
        })
    }

    const secret = req.app.get('jwt-secret')

    const check = (user) => {
        if (!user) {
            throw new Error('Failed to Login, non exist user')
        }
        if (!user.verify(password)) {
            throw new Error("Failed to Login, password is incorrect")
        }
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: user._id,
                    email: email,
                },
                secret,
                {
                    expiresIn: "1d",
                    issuer: "Tutor2Tutee",
                    subject: 'user information'
                },
                (err, token) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(token)
                }
            )
        })

    }

    const respond = (token) => {
        res.status(200).json({
            success: true,
            message: 'login is succesful',
            token
        })
    }

    const onError = (error) => {
        res.status(409).json({
            success: false,
            message: error.message
        })
    }

    User.findOneByEmail(email)
        .then(check)
        .then(respond)
        .catch(onError)


})


// 회원가입
router.post('/register', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const nickname = req.body.nickname
    console.log('registering ' + email)
    let birth = Date.now()
    // 날짜가 형식에 맞는지 확인
    try {
        birth = new Date(req.body.birth)
    } catch (e) {
        res.status(403).json({
            success: false,
            message: 'wrong date'
        })
    }

    // 각 항목이 비었는지 확인
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'email is empty'
        })
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'password is empty'
        })
    }

    if (!nickname) {
        return res.status(400).json({
            success: false,
            message: 'nickname is empty'
        })
    }


    const create = (user) => {
        if (user)
            throw new Error('user already exists')
        else
            return User.create(email, password, nickname, birth)

    }

    const respond = () => {
        res.status(201).json({
            success: true,
            message: email + ' registered'
        })
    }

    const onError = (error) => {
        res.status(409).json({
            success: false,
            message: error.message
        })
    }

    User.findOneByEmail(email)
        .then(create)
        .then(respond)
        .catch(onError)

})

router.use('/:id', authMiddleWare)
router.get('/:id', (req, res) => {
    if (req.params.id === req.decoded._id) {
        User.findOne({_id: req.params.id})
            .then(user => {
                res.status(200)
                    .json({
                        success: true,
                        message: 'success to find a user : ' + user.email,
                        _id : user._id,
                        email: user.email,
                        nickname: user.nickname,
                        birth: user.birth
                    })

            })
            .catch(err => {
                res.status(403)
                    .json({
                        success: false,
                        message: 'error while finding a user',
                        error: err.message
                    })
            })
    } else {
        res.status(403)
            .json({
                success: false,
                message: 'not a matching user'
            })
    }

})
module.exports = router