const express = require('express');
const router = express.Router();

const Quiz = require('../models/quizSchema');
const authMiddleWare = require('../middleware/auth')


// GET '/'
// Show all quizzes
// no authorization required
router.get('/', (req, res) => {
    Quiz.find().populate('creator', '_id nickname email')
        .exec(((err, res1) => {
            if (err) {
                res.status(409)
                    .json({
                        success: false,
                        message: err.message
                    })
            } else {
                res.status(200)
                    .json({
                        success: true,
                        message: 'success',
                        quizzes: res1
                    })
            }
        }))
});

// POST '/'
// make a quiz
// authorization required
router.use('/', authMiddleWare)
router.post('/', (req, res) => {
    const {title, questions, description} = req.body
    const userId = req.decoded._id


    function invalidInputHandler(msg){
        return res.status(400)
        .json({
            success: false,
            message: msg
        })
    }
    // Checking for invalid inputs
    if (!title) {
        invalidInputHandler("title is empty")
    }
    if (!questions.length) {
        invalidInputHandler("questions is empty")
    }
    if (!description) {
        invalidInputHandler("description is empty")
    }

    const respond = () => {
        res.status(201)
            .json({
                success: true,
                message: "quiz created successfully"
            })
    }

    const onError = (error) => {
        res.status(409)
            .json({
                success: false,
                message: error.message
            })
    }

    Quiz.create(userId, title,description,questions)
        .then(respond)
        .catch(onError)

});

//GET 'quiz/:id'
// show quiz matches id
// no authorization required
router.get('/:id', (req, res) => {
    // id가 정당한가요?
    if (req.params.id.length !== 24) {
        res.status(400)
            .json({
                success: false,
                message: 'wrong id format, check id length'
            })
    }

    // id와 매칭되는 클래스가 있어야해요!
    const isItExist = (_quiz) => {
        if (_quiz) {
            return _quiz
        } else {
            throw new Error("id")
        }
    }

    // response
    const response = (_quiz) => {
        res.status(200)
            .json({
                success: true,
                message: 'successfully find : ' + _quiz._id,
                data: _quiz
            })
    }

    // 에러 핸들링
    const onError = (error) => {
        if (error.message === 'id') {
            res.status(404)
                .json({
                    success: false,
                    message: "id doesn't exit"
                })
        } else {
            res.status(409)
                .json({
                    success: false,
                    message: error.message
                })
        }
    }


    Quiz.findOne({_id: req.params.id})
        .populate('creator', '_id nickname email teaching')
        .then(isItExist)
        .then(response)
        .catch(onError)
});

module.exports = router;
