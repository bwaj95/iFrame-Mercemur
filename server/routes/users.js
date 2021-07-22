import express from "express";
import { register, login, history } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/history", auth, history);

export default router;
