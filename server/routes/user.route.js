import express from "express";
import { getUser } from "../controllers/user.controller";

const router = express.Router();

// Endpoints
router.get('/find/:id', getUser);

export default router;