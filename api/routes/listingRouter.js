import express from "express";

import {
  createListing,
  updateListing,
  deleteListing,
  getListing,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
