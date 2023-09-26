import express from "express";
import { signup, login, verifyEmail } from "../controllers/AuthController.js";
import { sellItem } from "../controllers/SellController.js";
import { dashboardListItems } from "../controllers/DashboardController.js";

const router = express.Router();

router.post("/api/auth/signup", signup);
router.post("/api/auth/login", login);
router.get("/verify-email", verifyEmail);
router.post("/api/sell", sellItem);
router.get("/api/dashboard", dashboardListItems);

export default router;
