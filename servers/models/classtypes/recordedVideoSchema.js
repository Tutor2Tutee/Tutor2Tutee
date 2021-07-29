const mongoose = require('mongoose');
const Class = require('../classSchema');

// TODO : Attendance system
// if user access to this video
// user will get

const listenedSchema = new mongoose.Schema({
    listenerID: {type: mongoose.Schema.Types.ObjectId, required: true},
    listenedAt: {type: Date, default: Date.now}
})


const videoSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    created: {type: Date, default: Date.now},
    linkToVideo: {type: String, required: true},
    description: {type: String, required: true},
    whoListened: [listenedSchema],
})


// TODO : video should append by method in recordedVideoSchema's array
// ADD APPEND METHOD HERE
videoSchema.statics.create = async function (classID, name, link, description) {
    // create one videoSchema
    const video = new this({
        name,
        linkToVideo: link,
        description
    })

    await Class.updateOne(
        {classID},
        {$push: {classes: video._id}}
    )

    return video.save()
}


videoSchema.methods.attend = function (userID) {
    // add listener to videoSchemas whoListened array
    this.updateOne(
        {
            $push: {
                whoListened: listenedSchema({
                    listenerID: userID,
                })
            }
        }
    )

}

module.exports = mongoose.model('RecordedVideoType', videoSchema);