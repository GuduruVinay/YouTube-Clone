import express from "express";
import { dislikeVideo, getByTag, getByUser, getVideo, likeVideo, randomVideos } from "../controllers/video.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Endpoints
router.get('/random', randomVideos);

router.get('/find/:id', getVideo);

router.put('/like/:videoId', verifyToken , likeVideo);

router.put('/dislike/:videoId', verifyToken , dislikeVideo);

router.get('/user/:userId', getByUser);

router.get('/tags', getByTag);

export default router;