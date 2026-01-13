import express from "express";
import { dislikeVideo, getByTag, getByUser, getVideo, likeVideo, randomVideos, search } from "../controllers/video.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Endpoints
// GET /api/videos/search
router.get('/search', search);

// GET /api/videos/tags
router.get('/tags', getByTag);

// GET /api/videos/random
router.get('/random', randomVideos);

// GET /api/videos/find/12345
router.get('/find/:id', getVideo);

// PUT /api/videos/like/54321
router.put('/like/:videoId', verifyToken , likeVideo);

// PUT /api/videos/dislike/54321
router.put('/dislike/:videoId', verifyToken , dislikeVideo);

// PUT /api/videos/user/98765
router.get('/user/:userId', getByUser);



export default router;