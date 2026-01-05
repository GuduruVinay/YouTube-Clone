import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: [true, 'Please provide a video title']
    },
    "thumbnailUrl": {
        type: String,
        required: [true, 'Please provide a thumbnail url']
    },
    "videoUrl": {
        type: String,
        required: [true, 'Please provide a video url']
    },
    "description": {
        type: String,
    },
    "channelId": {
        type: mongooseSchema.Types.ObjectId,
        ref: 'Channel',
        required: [true, 'Please provide a channel Id']
    },
    "uploader": {
        type: mongooseSchema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a uploader']
    },
    "views": {
        type: Number,
        default: 0
    },
    "likes": {
        type: Number,
        default: 0
    },
    "dislikes": {
        type: Number,
        default: 0
    },
    "category": {
        type: String
    },
    "uploadDate": {
        type: Date,
        default: Date.now
    },
    "comments": [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const VideoModel = mongoose.Model('Videos', videoSchema);

export default VideoModel;