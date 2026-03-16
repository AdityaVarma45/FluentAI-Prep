import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Bookmark from "../models/Bookmark.js";

const router = express.Router();

/* GET BOOKMARKS */

router.get("/", authMiddleware, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch bookmarks",
    });
  }
});

/* ADD BOOKMARK */

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { tool, inputText, result } = req.body;

    const bookmark = await Bookmark.create({
      user: req.user.id,
      tool,
      inputText,
      result,
    });

    res.json(bookmark);
  } catch (error) {
    res.status(500).json({
      error: "Bookmark creation failed",
    });
  }
});

/* DELETE SINGLE */

router.delete("/:id", authMiddleware, async (req, res) => {
  await Bookmark.findByIdAndDelete(req.params.id);

  res.json({ message: "Bookmark deleted" });
});

/* DELETE ALL */

router.delete("/", authMiddleware, async (req, res) => {
  await Bookmark.deleteMany({
    user: req.user.id,
  });

  res.json({ message: "All bookmarks deleted" });
});

export default router;
