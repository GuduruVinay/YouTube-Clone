import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addComment, getComments } from "../controllers/comment.controller.js";

const router = express.Router();

// Endpoints
router.post("/", verifyToken, addComment);

router.get("/:videoId", getComments);

export default router;