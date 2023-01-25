import express from "express";
import { getConversation, newConversation } from "../controllers/conversation.js";

const router = express.Router()

//Create new conversation
router.post("/", newConversation)

//Get Conversation
router.get("/:userId", getConversation)

export default router