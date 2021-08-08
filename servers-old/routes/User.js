const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');
const authMiddleWare = require('../middleware/auth');

// 로그인
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // 각 항목이 비었는지 확인
    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'email is empty',
        });
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'password is empty',
        });
    }

    const secret = req.app.get('jwt-secret');
    const check = (user) => {
        if (!user) {
            throw new Error('non exist user');
        }
        if (!user.verify(password)) {
            throw new Error('password is incorrect');
        }
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: user._id,
                    email: email,
                },
                secret,
                {
                    expiresIn: '1d',
                    issuer: 'Tutor2Tutee',
                    subject: 'user information',
                },
                (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    resolve({ token, user });
                },
            );
        });
    };

    const respond = ({ token, user }) => {
        res.status(200).json({
            success: true,
            message: 'login is successful',
            user: user._id,
            token,
        });
    };

    const onError = (error) => {
        switch (error.message) {
            case 'non exist user':
                res.status(400).json({
                    success: false,
                    message: 'non exist user',
                });
                break;

            case 'password is incorrect':
                res.status(400).json({
                    success: false,
                    message: 'incorrect password',
                });
                break;

            default:
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
        }
    };

    User.findOneByEmail(email).then(check).then(respond).catch(onError);
});

// 회원가입
router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const birth = req.body.birth;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'email is empty',
        });
    }
    if (!password) {
        return res.status(400).json({
            success: false,
            message: 'password is empty',
        });
    }

    if (!nickname) {
        return res.status(400).json({
            success: false,
            message: 'nickname is empty',
        });
    }

    if (!birth) {
        return res.status(400).json({
            success: false,
            message: 'birth is empty',
        });
    }

    // is data matches format?
    if (
        birth.match(
            /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/g,
        ) === null
    ) {
        return res.status(400).json({
            success: false,
            message: 'wrong date',
        });
    }
    let BirthDate = new Date(birth);

    const create = (user) => {
        if (user) throw new Error('user already exists');
        else return User.create(email, password, nickname, BirthDate);
    };

    const respond = (user) => {
        res.status(201).json({
            success: true,
            message: user.email + ' registered',
        });
    };

    const onError = (error) => {
        switch (error.message) {
            case 'user already exists':
                res.status(400).json({
                    success: false,
                    message: 'user already exists',
                });
                break;
            default:
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
        }
    };

    User.findOneByEmail(email).then(create).then(respond).catch(onError);
});

router.use('/:id', authMiddleWare);
router.get('/:id', (req, res) => {
    if (req.params.id === req.decoded._id) {
        User.findOne({ _id: req.params.id })
            .then((user) => {
                res.status(200).json({
                    success: true,
                    message: 'success to find a user : ' + user.email,
                    _id: user._id,
                    email: user.email,
                    nickname: user.nickname,
                    birth: user.birth,
                });
            })
            .catch((err) => {
                res.status(403).json({
                    success: false,
                    message: 'error while finding a user',
                    error: err.message,
                });
            });
    } else {
        res.status(403).json({
            success: false,
            message: 'not a matching user',
        });
    }
});
module.exports = router;
