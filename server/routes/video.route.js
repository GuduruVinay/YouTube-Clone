import express from "express";
import { randomVideos } from "../controllers/video.controller.js";

const router = express.Router();

// Endpoints
router.get('/random', randomVideos);

export default router;