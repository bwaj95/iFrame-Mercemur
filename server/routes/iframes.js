import express from "express";
import { createFrame, getFrameById } from "../controllers/iframe.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", getFrameById);
router.post("/", auth, createFrame);

export default router;
