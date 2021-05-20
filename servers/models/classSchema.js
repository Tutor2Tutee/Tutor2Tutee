const mongoose = require('mongoose')
require('./userSchema')

const classSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique:true},
    created: {type: Date, default: Date.now},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    listener: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    point: {type: Number, min: 0, max: 50, default: 0},
    classType: {type: String, required: true}
})




classSchema.statics.create = function(_id, name, point, classType){
    const _class = new this({
        name,
        teacher:_id,
        point,
        classType
    })
    return _class.save()
}

classSchema.statics.findByName = function(name){
    return this.findOne({name}).exec()
}



module.exports = mongoose.model('Class', classSchema)