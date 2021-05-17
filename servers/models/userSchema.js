const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, trim: true},
    nickname: {type: String, required: true, unique: true},
    birth: {type: Date, default: Date.now},
    point: {type: Number, default: 0, min: 0},
    listening: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],
    teaching: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],
})


// 스키마를 확장한다.
userSchema.statics.create = function (email, password, nickname, birth) {
    const user = new this({
        email, password, nickname, birth, point: 0
    })

    return user.save()
}
userSchema.statics.findOneByEmail = function (email) {
    return this.findOne({
        email
    }).exec()
}

userSchema.methods.verify = function (password) {
    console.log(this.password)
    console.log(password)
    return this.password === password
}

module.exports = mongoose.model('User', userSchema)

