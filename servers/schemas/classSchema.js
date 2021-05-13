const mongoose = require('mongoose')
require('./userSchema')

const classSchema = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    name : {type:String, required:true},
    created : {type:Date, default:Date.now},
    teacher : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    listeners : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    point : {type:Number, min:0, max:50},
    type : {type:String, required:true}
})

module.exports = mongoose.model('Class', classSchema)