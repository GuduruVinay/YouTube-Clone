import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    "videoId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: [true, 'Please provide a video Id']
    },
    "userId": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user Id']
    },
    "text": {
        type: String,
        required: [true, 'Please provide a text']
    },
    "timestamp": {
        type: Date,
        default: Date.now
    }
});

const CommentModel = mongoose.model("Comment", commentSchema);

export default CommentModel;