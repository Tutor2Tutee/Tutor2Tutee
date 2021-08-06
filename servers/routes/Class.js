const express = require('express');
const router = express.Router();

const Class = require('../models/classSchema');
const authMiddleWare = require('../middleware/auth')


// GET 'class/'
// Show all classes
// no authorization required
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

//GET 'class/:id'
// show class matches id
// no authorization required
router.get('/:id', (req, res) => {
    // id가 정당한가요?
    if (req.params.id.length !== 24) {
        return res.status(400)
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
        return res.status(200)
            .json({
                success: true,
                message: 'successfully find : ' + _class._id,
                data: _class
            })
    }

    // 에러 핸들링
    const onError = (error) => {
        if (error.message === 'id') {
            return res.status(404)
                .json({
                    success: false,
                    message: "id doesn't exist"
                })
        } else {
            return res.status(409)
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

// POST '/'
// make a class
// authorization required
router.use('/', authMiddleWare)
router.post('/', (req, res) => {
    const {name, point, classType, description} = req.body
    const userId = req.decoded._id


    // 세가지 parameter(name, point, classType)가 존재하는지 확인!
    if (!name) {
        return res.status(400)
            .json({
                success: false,
                message: 'name is empty'
            })
    }
    if (!point) {
        return res.status(400)
            .json({
                success: false,
                message: "point is empty"
            })
    }
    if (!classType) {
        return res.status(400)
            .json({
                success: false,
                message: 'classType is empty'
            })
    }
    if (!description) {
        return res.status(400)
            .json({
                success: false,
                message: "description is empty"
            })
    }

    // 클래스가 이미 존재하는 지 확인.
    const create = (_class) => {
        if (_class) {
            throw new Error('class exists')
        } else {
            return Class.create(userId, name, point, classType, description)
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
        switch (error.message) {
            case 'class exists':
                return res.status(400)
                    .json({
                        success: false,
                        message: "class name is already exists"
                    })
            default:
                return res.status(409)
                    .json({
                        success: false,
                        message: error.message
                    })

        }
    }

    Class.findByName(name)
        .then(create)
        .then(respond)
        .catch(onError)


});


// POST 'class/:id'
// register a Class
// authorization required
router.use('/:id', authMiddleWare)
router.post('/:id', (req, res) => {
    // listener id
    const listenerID = req.decoded._id

    // is id correct?
    if (req.params.id.length !== 24) {
        res.status(400)
            .json({
                success: false,
                message: 'wrong id format, check id length'
            })
    }

    // need matching class
    const isItExist = (_class) => {
        if (_class) {
            return _class
        } else {
            throw new Error("id")
        }
    }


    // owner can't get this class
    const checkOwner = (_class) => {
        if (_class.teacher.toString() === listenerID) {
            throw new Error('owner')
        } else {
            return _class
        }
    }

    // listner는 이 강의를 중복 수강을 못해요!
    const checkListener = (_class) => {
        if (_class.listener.includes(listenerID)) {
            throw new Error('listener')
        } else {
            return _class
        }
    }

    // 클래스 수강(attend)
    const register = (_class) => {
        // 클래스 가입에 성공하면?
        _class.registerClassById(listenerID)
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
                        message: "id doesn't exist"
                    })
                break

            case 'owner':
                res.status(400)
                    .json({
                        success: false,
                        message: "owner can't register it's class"
                    })
                break

            case 'listener':
                res.status(400)
                    .json({
                        success: false,
                        message: 'already a member'
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
        .then(register)
        .then(response)
        .catch(onError)

});

// PUT 'class/:id'
// class modification
// authorization needed
router.put('/:id', (req, res) => {
    // status code
    // 201 : Modifed
    // 204 : Not Modified <- no body
    // 200 : Not Modified <- with body
    const {name, point, type, description} = req.body
    const teacherID = req.decoded._id

    // is request.parameter correct?
    if (req.params.id.length !== 24) {
        res.status(400)
            .json({
                success: false,
                message: 'wrong id format, check id length'
            })
    }

    // need matching class
    const isItExist = (_class) => {
        if (_class) {
            return _class
        } else {
            throw new Error("id")
        }
    }

    // check modifier is teacher
    const checkTeacher = (_class) => {
        if (_class.teacher.toString() === teacherID)
            return _class
        else
            throw new Error("teacher")
    }

    // returns changes
    const change = async (_class) => {
        let changes = []

        // name exist and not the same name
        if (name && _class.name !== name) {
            await Class.findByName(name)
                .then(className => {
                    if (className) {
                        throw new Error("existing Class")
                    }
                })
                .then(async () => {
                    await Class.updateOne(
                        {_id: _class._id},
                        {$set: {name}}
                    )
                })
                .then(changes.push("name"))
        }

        // point exist and not the same point
        if (point && _class.point !== point) {
            await Class.updateOne(
                {_id: req.params.id},
                {$set: {point}}
            )
            changes.push("point")
        }

        // type exist and not the same type
        if (type && _class.classType !== type) {
            await Class.updateOne(
                {_id: req.params.id},
                {$set: {classType: type}}
            )
            changes.push('type')
        }

        // description exist and no the same description
        if (description && _class.description !== description) {
            await Class.updateOne(
                {_id: req.params.id},
                {$set: {description}}
            )
            changes.push('description')
        }

        return changes
    }

    const response = (changes) => {
        if (changes.length) {
            return res.status(201)
                .json({
                    success: true,
                    message: 'successfully modified',
                    changed: changes.join(', ')
                })
        } else {
            return res.status(200)
                .json({
                    success: true,
                    message: 'nothing modified'
                })

        }
    }

    const onError = (error) => {
        switch (error.message) {
            case 'id':
                res.status(404)
                    .json({
                        success: false,
                        message: "id doesn't exist"
                    })
                break

            case 'teacher':
                res.status(400)
                    .json({
                        success: false,
                        message: 'only can be modified by teacher'
                    })
                break

            case "existing Class":
                res.status(400)
                    .json({
                        success: false,
                        message: 'class name already exists'
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
        .then(checkTeacher)
        .then(change)
        .then(response)
        .catch(onError)


});


//DELETE
// DELETE A CLASS
// AUTHORIZATION REQUIRED
router.delete('/:id', (req, res) => {
    // status code
    // 200 : DELETED, NOTHING TO SHOW TO YOU

    const teacherID = req.decoded._id

    // is request.parameter correct?
    if (req.params.id.length !== 24) {
        return res.status(400)
            .json({
                success: false,
                message: 'wrong id format, check id length'
            })
    }

    // need matching class
    const isItExist = (_class) => {
        if (_class) {
            return _class
        } else {
            throw new Error("id")
        }
    }

    // check modifier is teacher
    const checkTeacher = (_class) => {
        if (_class.teacher.toString() === teacherID)
            return _class
        else
            throw new Error("teacher")
    }

    // DELETE
    const deleteClass = (_class) => {
        Class.deleteOne({_id: _class._id})
            .then(() => {
                return res.status(200)
                    .json({
                        success: true,
                        message: 'successfully deleted : ' + _class.name
                    })
            })

    }

    // error handling
    const onError = (error) => {
        switch (error.message) {
            case 'id':
                return res.status(404)
                    .json({
                        success: false,
                        message: "id doesn't exist"
                    })

            case 'teacher':
                return res.status(400)
                    .json({
                        success: false,
                        message: 'only can be modified by teacher'
                    })

            default:
                return res.status(409)
                    .json({
                        success: false,
                        message: error.message
                    })
        }
    }


    Class.findOne({_id: req.params.id})
        .then(isItExist)
        .then(checkTeacher)
        .then(deleteClass)
        .catch(onError)

});


module.exports = router;
