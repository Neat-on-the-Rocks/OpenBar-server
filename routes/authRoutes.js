import express from "express"
import { login } from "../controllers/auth.js";

//Login Controller input
const router = express.Router();

router.post("/login", login)

export default router