import express from "express";
import { SignUp, google, signIn } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/sign-in", signIn);
router.post("/google", google);

export default router;
