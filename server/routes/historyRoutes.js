import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import History from "../models/History.js";

const router = express.Router();

/* GET HISTORY */

router.get("/", authMiddleware, async (req, res) => {
  const history = await History.find({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(history);
});

/* DELETE SINGLE */

router.delete("/:id", authMiddleware, async (req, res) => {
  await History.findByIdAndDelete(req.params.id);

  res.json({ message: "History deleted" });
});

/* DELETE ALL */

router.delete("/", authMiddleware, async (req, res) => {
  await History.deleteMany({
    user: req.user.id,
  });

  res.json({ message: "All history deleted" });
});

export default router;
