import express from "express";
import multer from "multer";
import path from "path";
import { signup, login, verifyEmail } from "../controllers/AuthController.js";
import { sellItem } from "../controllers/SellController.js";

const router = express.Router();

router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);
router.get("/verify-email", verifyEmail);
router.post("/api/sell", sellItem)

export default router;
