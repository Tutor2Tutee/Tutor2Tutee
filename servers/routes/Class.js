const express = require('express');
const router = express.Router();

const Class = require('../models/classSchema');
const authMiddleWare = require('../middleware/auth')

//GET 'class/:id'
// id에 해당하는 클래스 보여주기
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
    const isItExist = (_class) => {
        if (_class) {
            return _class
        } else {
            throw new Error("id")
        }
    }

    // response
    const response = (_class) => {
        res.status(200)
            .json({
                success: true,
                message: 'successfully find : ' + _class._id,
                data: _class
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


    Class.findOne({_id: req.params.id})
        .populate('teacher', '_id nickname email teaching')
        .then(isItExist)
        .then(response)
        .catch(onError)
});


// GET 'class/'
// 모든 클래스를 보여주기
router.get('/', (req, res) => {
    Class.find().populate('teacher', '_id nickname email')
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
                        classes: res1
                    })
            }
        }))
});


// POST 'class/:id'
// id에 해당하는 강의 수강하기
router.use('/:id', authMiddleWare)
router.post('/:id', (req, res) => {
    // 수강하려는 사람의 id
    const listenerID = req.decoded._id

    // id가 정당한가요?
    if (req.params.id.length !== 24) {
        res.status(400)
            .json({
                success: false,
                message: 'wrong id format, check id length'
            })
    }


    // owner는 이 강의를 수강을 못하죠!
    const checkOwner = (_class) => {
        if (_class.teacher.toString() === listenerID){
            throw new Error('owner')
        } else {
            return _class
        }
    }

    // listner는 이 강의를 중복 수강을 못해요!
    const checkListener = (_class) => {
        if (_class.listener.includes(listenerID)){
            throw new Error('listener')
        } else {
            return _class
        }
    }

    // id와 매칭되는 클래스가 있어야해요!
    const isItExist = (_class) => {
        if (_class) {
            return _class
        } else {
            throw new Error("id")
        }
    }

    const attend = (_class) => {
        // 클래스 가입에 성공하면?
        _class.attendClassById(listenerID)
        return _class
    }

    // response
    const response = (_class) => {
        res.status(201)
            .json({
                success: true,
                message: 'successfully attended class : ' + _class.name
            })

    }

    // 에러 핸들링
    const onError = (error) => {
        switch (error.message) {
            case 'id':
                res.status(404)
                    .json({
                        success: false,
                        message: "class id doesn't exit"
                    })
                break

            case 'owner':
                res.status(400)
                    .json({
                        success: false,
                        message : "owner can't attend it's class"
                    })
                break

            case 'listener':
                res.status(400)
                    .json({
                        success: false,
                        message : 'already a member'
                    })
                break

            default:
                res.status(409)
                    .json({
                        success: false,
                        message: error.message
                    })
        }
    }

    Class.findOne({_id: req.params.id})
        .then(isItExist)
        .then(checkOwner)
        .then(checkListener)
        .then(attend)
        .then(response)
        .catch(onError)

});


// POST '/'
// class 개설
router.use('/', authMiddleWare)
router.post('/', async (req, res, next) => {
    const {name, point, classType} = req.body
    const userId = req.decoded._id


    // 세가지 parameter(name, point, classType)가 존재하는지 확인!
    if (!name) {
        res.status(400)
            .json({
                success: false,
                message: 'name is empty'
            })
    }
    if (!point) {
        res.status(400)
            .json({
                success: false,
                message: "point is empty"
            })
    }
    if (!classType) {
        res.status(400)
            .json({
                success: false,
                message: 'classType is empty'
            })
    }

    // 클래스가 이미 존재하는 지 확인.
    const create = (_class) => {
        if (_class) {
            throw new Error('class name is already exists')
        } else {
            return Class.create(userId, name, point, classType)
        }
    }

    const respond = (_class) => {
        res.status(201)
            .json({
                success: true,
                message: "class '" + _class.name + "' created"
            })
    }

    const onError = (error) => {
        res.status(409)
            .json({
                success: false,
                message: error.message
            })
    }

    Class.findByName(name)
        .then(create)
        .then(respond)
        .catch(onError)

});

//PUT
router.put('/:id', async (req, res, next) => {
    const { name,teacherId,listenerId,point,type } = req.body
    
    let foundClass;
    
    try{
         foundClass = await Class.findOne({id:req.params.id});
    } catch(err){
        return next(err)
    }

    foundClass.name = name
    // foundClass.teacher = teacherId,
    // foundClass.listener.push(listenerId)
    // foundClass.point = point
    // foundClass.type = type
    
    try{
        await foundClass.save()
    } catch(err){
        return next(err)
    }

    res.status(201).json({class:foundClass})
});


//DELETE
router.delete('/:id', async (req, res, next) => {
    
    let foundClass;
    try{
        foundClass = await Class.findOne({id:req.params.id});
    } catch(err){
        return next(err)
    }
    
    try{
        await foundClass.remove()
    } catch(err){
        return next(err)
    }

    res.status(202).json({message:"deleted successfully",class:foundClass})
});


module.exports = router;
