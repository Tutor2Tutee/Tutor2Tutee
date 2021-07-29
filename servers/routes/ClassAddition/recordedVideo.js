const Class = require('../../models/classSchema')

const isItExist = (_class) => {
    if (_class) {
        return _class;
    } else {
        throw new Error("class")
    }
}

const checkClassType = (_class) => {
    if (_class.classType.toString() === 'recordedVideo') {
        return _class
    } else {
        throw new Error("classtype")
    }
}

const getChapter = (req, res) => {
    // need matching class

    const response = (_class) => {
        res.status(200)
            .json({
                success: true,
                message: 'successfully find classes',
                classes: _class.classes
            })
    }

    const onError = (error) => {
        switch (error.message) {
            case 'class':
                res.status(404)
                    .json({
                        success: false,
                        message: "class id doesn't exist"
                    })
                break
            case 'classtype':
                res.status(400)
                    .json({
                        success: false,
                        message: "this request only works with recordedVideo type classes"
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

    Class
        .findOne({_id: req.params.id})
        .then(isItExist)
        .then(checkClassType)
        .then(response)
        .catch(onError)

}

module.exports = {getChapter}