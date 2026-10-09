import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Quiz",
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 14,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  },
  { timestamps: true },
);

playerSchema.index({ quizId: 1, username: 1 }, { unique: true });
playerSchema.index({ quizId: 1, email: 1 }, { unique: true });
export default mongoose.model("Player", playerSchema);
