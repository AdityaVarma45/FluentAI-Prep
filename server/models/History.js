import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    tool: String,

    inputText: String,

    result: String,

    provider: String,
  },
  { timestamps: true },
);

export default mongoose.model("History", historySchema);
