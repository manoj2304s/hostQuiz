import express from "express";

const healthRoutes = express.Router();

healthRoutes.get("/", (req, res) => {
  res.json("Health route is running");
});

export default healthRoutes;
