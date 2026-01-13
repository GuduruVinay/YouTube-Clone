import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getUser, subscribe, unsubscribe } from "../controllers/user.controller.js";

const router = express.Router();

// Endpoints
// GET /api/users/find/12345
router.get('/find/:id', getUser);

// PUT /api/users/sub/12345
router.put('/sub/:id', verifyToken, subscribe);

// PUT /api/users/unsub/12345
router.put('/unsub/:id', verifyToken, unsubscribe);

export default router;