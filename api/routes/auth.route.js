import express from "express";
import { SignUp, signIn } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/sign-in", signIn);

export default router;
