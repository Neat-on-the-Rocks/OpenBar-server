import express from "express";
import { newMessage, getMessages } from "../controllers/message.js";

const router = express.Router()

//Add new Message
router.post("/", newMessage)

//Get Messages
router.get("/:conversationId", getMessages)


export default router