const mongoose = require('mongoose')
const User = require('./userSchema')

const classSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    created: {type: Date, default: Date.now},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    listener: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    point: {type: Number, min: 0, max: 50, default: 0},
    classType: {type: String, required: true},
    description: {type: String, required: true},
    classes: [{type:mongoose.Schema.Types.Mixed}]
})


classSchema.statics.create = async function (_id, name, point, classType, description) {
    // 새로운 클래스
    const _class = new this({
        name,
        teacher: _id,
        point,
        classType,
        description
    })

    // 생성한 유저의 teaching list 에 값 추가
    await User.updateOne(
        {_id},
        {$push: {teaching: _class._id}},
    )

    return _class.save()
}

classSchema.statics.findByName = function (name) {
    return this.findOne({name}).exec()
}

classSchema.methods.registerClassById = async function (listenerID) {
    await this.updateOne(
        {$push: {listener: listenerID}}
    )

    await User.updateOne(
        {_id: listenerID},
        {$push: {listening: this._id}}
    )
}


module.exports = mongoose.model('Class', classSchema)