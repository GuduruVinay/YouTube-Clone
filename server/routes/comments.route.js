import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addComment, deleteComment, getComments, updateComment } from "../controllers/comment.controller.js";

const router = express.Router();

// Endpoints
router.post("/", verifyToken, addComment);

router.delete('/:id', verifyToken, deleteComment);

router.put('/:id', verifyToken, updateComment);

router.get("/:videoId", getComments);

export default router;