import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getUser, subscribe, unsubscribe } from "../controllers/user.controller.js";

const router = express.Router();

// Endpoints
router.get('/find/:id', getUser);

router.put('/sub/:id', verifyToken, subscribe);

router.put('/unsub/:id', verifyToken, unsubscribe);

export default router;