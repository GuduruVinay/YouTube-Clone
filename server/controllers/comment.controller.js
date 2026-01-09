import Comment from "../models/Comment.model";


export async function addComment(req, res) {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        return res.status(200).json(savedComment);
    } catch(err) {
        return res.status(500).json(err);
    };
}

export async function getComments(req, res) {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        return res.status(200).json(comments);
    } catch(err) {
        return res.status(500).json(err);
    };
}