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

router.post('/', async (req, res, next) => {
    const { name,teacherId,point,type } = req.body

    const newClass = new Class({
        name,
        // teacher:teacherId,
        listener:[],
        point,
        type
    });

    newClass.id = newClass._id

    try{
        await newClass.save()
    } catch(err){
        return next(err)
    }

    res.status(201).json({message:"Class created successfully",class:newClass})
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
