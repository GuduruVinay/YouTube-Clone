import Video from "../models/Video.model.js";
import Comment from "../models/Comment.model.js";
import { createError } from "../utils/error.js";

// POST Add comment
export async function addComment(req, res, next) {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
        const savedComment = await newComment.save();
        return res.status(200).send(savedComment);
    } catch(err) {
        next(err);
    };
}

// GET all comments
export async function getComments(req, res, next) {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId });
        return res.status(200).json(comments);
    } catch(err) {
        next(err);
    };
}

// PUT Update comment
export async function updateComment(req, res, next) {
    try {
        const comment = await Comment.findById(req.params.id);
        if(!comment) return next(createError(404, "Comment not found!"));

        // Only the comment author can edit
        if(req.user.id === comment.userId.toString()) {
            const updatedComment = await Comment.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            return res.status(200).json(updatedComment);
        } else {
            return next(createError(403, "You can update only your comment!"));
        }
    } catch(err) {
        next(err);
    };
}

// DELETE comment
export async function deleteComment(req, res, next) {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(comment.videoId);

        // Ensure both comment and video exist
        if(!comment) return next(createError(404, "Comment not found!"));
        if(!video) return next(createError(404, "Video not found!"));

        // Allow delete if User is the Comment Owner OR the Video Owner
        if(req.user.id === comment.userId.toString() || req.user.id === video.userId.toString()) {
            await Comment.findByIdAndDelete(req.params.id);
            return res.status(200).json("The comment has been deleted.");
        } else {
            return next(createError(403, "You can delete only your comment!"));
        }
    } catch(err) {
        next(err);
    };
}