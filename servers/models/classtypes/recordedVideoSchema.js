const mongoose = require('mongoose');


const videoSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true},
    created: {type: Date, default: Date.now},
    linkToVideo : {type: String, required: true}
})

const recordedVideoSchema = new mongoose.Schema({
    classes: [{type: videoSchema}],
    // whoListened : []
})


module.exports = mongoose.model('RecordedVideo', recordedVideoSchema);