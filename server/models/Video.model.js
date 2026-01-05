import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: [true, 'Please provide a video title']
    },
    "desc": {
        type: String,
    },
    "imgUrl": {
        type: String,
        required: [true, 'Please provide a thumbnail url']
    },
    "videoUrl": {
        type: String,
        required: [true, 'Please provide a video url']
    },
    "userId": {
        type: mongooseSchema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user Id']
    },
    "channelId": {
        type: mongooseSchema.Types.ObjectId,
        ref: 'Channel',
        required: [true, 'Please provide a channel Id']
    },
    "views": {
        type: Number,
        default: 0
    },
    "tags": {
        type: [String],
        default: []
    },
    "likes": {
        type: [String],
        default: []
    },
    "dislikes": {
        type: [String],
        default: []
    }
}, { timestamps: true });

const VideoModel = mongoose.Model('Videos', videoSchema);

export default VideoModel;