const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, required: true, trim: true},
    nickname: {type: String, required: true},
    birth: {type: Date, default: Date.now},
    point: {type: Number, default: 0, min: 0},
    listening: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],
    teaching: [{type: mongoose.Schema.Types.ObjectId, ref: 'Class'}],
})

module.exports = mongoose.model('User', userSchema)

