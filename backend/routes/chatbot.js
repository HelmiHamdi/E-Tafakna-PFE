// routers/chatbot.js

import express from 'express';
import { chatbotController } from '../controllers/chatbot.js';

const router = express.Router();

router.post('/chatbot', chatbotController);

export default router;
