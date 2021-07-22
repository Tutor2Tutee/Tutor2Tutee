const mongoose = require('mongoose');
const User = require('../userSchema');

// TODO : Attendance system
// if user access to this video
// user will get
const videoSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    created: {type: Date, default: Date.now},
    linkToVideo: {type: String, required: true},
    whoListened: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
})

const recordedVideoSchema = new mongoose.Schema({
    classes: [{type: videoSchema, ref:"Video"}],
})

mongoose.model("Video", videoSchema)


// TODO : video should append by method in recordedVideoSchema's array
// ADD APPEND METHOD HERE
videoSchema.methods.checkAttendance = async function (attendee) {
    await this.updateOne
}


module.exports = mongoose.model('RecordedVideo', recordedVideoSchema);