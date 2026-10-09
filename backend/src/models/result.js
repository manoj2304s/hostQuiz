import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  score: {
    type: Number,
    default: 0,
    min: 0,
  },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      selectedIndex: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

resultSchema.index({ quizId: 1, playerId: 1 }, { unique: true });
resultSchema.index({ quizId: 1, score: -1 });
export default mongoose.model("Result", resultSchema);
