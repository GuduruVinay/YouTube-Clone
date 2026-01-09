import express from "express";
import { dislikeVideo, getVideo, likeVideo, randomVideos } from "../controllers/video.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Endpoints
router.get('/random', randomVideos);

router.get('/find/:id', getVideo);

router.put('/like/:videoId', verifyToken , likeVideo);

router.put('/dislike/:videoId', verifyToken , dislikeVideo);

export default router;