import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addComment, getComments } from "../controllers/comment.controller";

const router = express.Router();

// Endpoints
router.post("/", verifyToken, addComment);

router.get("/:videoId", getComments);

export default router;