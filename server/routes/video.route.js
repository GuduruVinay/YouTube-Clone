import express from "express";
import { dislikeVideo, getVideo, likeVideo, randomVideos } from "../controllers/video.controller.js";

const router = express.Router();

// Endpoints
router.get('/random', randomVideos);

router.get('/find/:id', getVideo);

router.put('/like/:videoId', likeVideo);

router.put('/dislike/:videoId', dislikeVideo);

export default router;