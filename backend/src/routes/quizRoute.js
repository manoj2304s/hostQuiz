import express from "express";
import {
  createQuiz,
  listQuiz,
  getQuiz,
} from "../controllers/quizController.js";

const quizRoutes = express.Router();

quizRoutes.post("/", createQuiz);
quizRoutes.get("/", listQuiz);
quizRoutes.get("/:id", getQuiz);

export default quizRoutes;
