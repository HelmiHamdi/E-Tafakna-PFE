import express from "express";
import { getMyMessage, sendMessage } from "../controllers/chat.js";

const router = express.Router();

router.get("/:id", getMyMessage);
router.post("/", sendMessage);

export default router;
