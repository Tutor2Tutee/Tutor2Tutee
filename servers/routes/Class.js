const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Class = require('../models/classSchema');

//GET
router.get('/:id', async (req, res, next) => {
    let foundClass;

    try{
         foundClass = await Class.findOne({id:req.params.id});
    } catch(err){
        return next(err)
    }

    res.status(200).json({ class: foundClass });
});

router.get('/', async (req, res, next) => {
    let classList
    try{
        classList = await Class.find();
    } catch(err){
        return next(err)
    }
    res.status(200).json({ class: classList });
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
