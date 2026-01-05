import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

// Endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;