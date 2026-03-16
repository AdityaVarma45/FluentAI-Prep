import Bookmark from "../models/Bookmark.js";
import jwt from "jsonwebtoken";

export const saveBookmark = async (req, res) => {
  try {
    const { tool, inputText, result } = req.body;

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Login required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const bookmark = await Bookmark.create({
      userId: decoded.id,
      tool,
      inputText,
      result,
    });

    res.json(bookmark);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Login required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const bookmarks = await Bookmark.find({
      userId: decoded.id,
    }).sort({ createdAt: -1 });

    res.json(bookmarks);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
};
