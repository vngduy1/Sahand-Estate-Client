import express from "express";

import {
  createListing,
  updateListing,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.post("/update", verifyToken, updateListing);

export default router;
