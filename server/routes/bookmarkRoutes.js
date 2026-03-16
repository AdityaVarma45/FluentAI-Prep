import express from "express";
import { saveBookmark, getBookmarks } from "../controllers/bookmarkController.js";

const router = express.Router();

router.post("/", saveBookmark);
router.get("/", getBookmarks);

export default router;