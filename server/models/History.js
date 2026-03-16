import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tool: String,

    inputText: String,

    result: String,

    provider: String,
  },
  { timestamps: true },
);

export default mongoose.model("History", historySchema);
