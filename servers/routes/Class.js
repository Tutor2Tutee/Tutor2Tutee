const express = require('express');
const router = express.Router();

const Class = require('../models/classSchema');
const authMiddleWare = require('../middleware/auth')

//GET
router.get('/:id', (req, res, next) => {
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


// GET '/'
// 모든 클래스를 보여주기
router.get('/', (req, res, next) => {
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


//POST
router.post('/:id', async (req, res, next) => {
    let foundClass;
    
    try{
        foundClass = await Class.findOne({id:req.params.id});
    } catch(err){
        return next(err)
    }

    try{
        await foundClass.save()
    } catch(err){
        return next(err)
    }

    res.status(201).json({class:foundClass})
});


// POST '/'
// class 수강
router.use('/', authMiddleWare)
router.post('/', async (req, res, next) => {
    const {name, point, classType} = req.body
    console.log(name)
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
