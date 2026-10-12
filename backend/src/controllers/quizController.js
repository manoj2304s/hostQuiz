import mongoose from "mongoose";
import Quiz from "../models/quiz.js";

const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const createQuiz = async (req, res, next) => {
  const { title, questions } = req.body;

  try {
    for (let attempt = 1; attempt <= 5; attempt++) {
      const roomCode = generateRoomCode();

      try {
        const quiz = await Quiz.create({
          title,
          roomCode,
          questions,
        });

        return res.status(201).json({
          message: "Quiz created successfully",
          quiz,
        });
      } catch (err) {
        const isRoomCodeCollision =
          err.code === 11000 && err.keyPattern?.roomCode === 1;

        if (!isRoomCodeCollision) {
          throw err;
        }
      }
    }
    const error = new Error(
      "Unable to generate a unique room code. Please try again",
    );
    error.status = 503;
    throw error;
  } catch (err) {
    next(err);
  }
};

export const listQuiz = async (req, res, next) => {
  try {
    const allQuizzes = await Quiz.aggregate([
      {
        $project: {
          _id: 0,
          title: 1,
          status: 1,
          roomCode: 1,
          questionCount: { $size: "$questions" },
        },
      },
    ]);

    res.status(200).json({
      message: "Fetch complete",
      allQuizzes,
    });
  } catch (err) {
    next(err);
  }
};

export const getQuiz = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid quiz ID",
      });
    }
    const quizById = await Quiz.findById(id);
    if (!quizById) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }
    return res.status(200).json({
      quiz: quizById,
    });
  } catch (err) {
    next(err);
  }
};
