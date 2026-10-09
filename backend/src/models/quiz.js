import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    roomCode: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
      match: /^[A-Z0-9]{6}$/,
      unique: true,
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["draft", "live", "ended"],
      default: "draft",
    },
    questions: [
      {
        text: { type: String, required: true, trim: true },
        options: {
          type: [{ type: String, trim: true }],
          required: true,
          validate: {
            validator: function (options) {
              return (
                options &&
                options.length >= 2 &&
                options.length <= 6 &&
                options.every((option) => option.length > 0)
              );
            },
            message: "Options must contain 2 to 6 items",
          },
        },
        correctIndex: {
          type: Number,
          required: true,
          min: 0,
          max: 5,
          validate: {
            validator: function (correctIndex) {
              return correctIndex >= 0 && correctIndex < this.options.length;
            },
            message: "Option is Invalid for this question",
          },
        },
        points: { type: Number, default: 10, min: 0 },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Quiz", quizSchema);
