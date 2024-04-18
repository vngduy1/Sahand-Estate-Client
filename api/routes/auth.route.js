import express from "express";
import {
  SignUp,
  google,
  signIn,
  signOut,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", SignUp);
router.post("/sign-in", signIn);
router.post("/google", google);
router.get("/sign-out", signOut);

export default router;
