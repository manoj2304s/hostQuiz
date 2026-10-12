import "dotenv/config";
import express from "express";
import quizRoutes from "./routes/quizRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import healthRoutes from "./routes/healthRoute.js";

const app = express();
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/quizzes", quizRoutes);

app.use(errorHandler);

export default app;
