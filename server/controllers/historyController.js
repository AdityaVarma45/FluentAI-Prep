import History from "../models/History.js";

export const getHistory = async (req, res) => {
  try {

    const history = await History.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(history);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};