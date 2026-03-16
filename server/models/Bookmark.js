import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tool: String,

    inputText: String,

    result: String,
  },
  { timestamps: true },
);

export default mongoose.model("Bookmark", bookmarkSchema);
