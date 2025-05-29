// api/app.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./config/Database.js";
import userRouter from "./routes/UserRoutes.js";
import productRouter from "./routes/ProductRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use((req, res, next) => {
  res.setTimeout(60000);
  next();
});

app.get("/", async (req, res) => {
  await database();
  res.send(`Connceted Vercel`);
});

app.get("/vercel", async (req, res) => {
  await database();
  res.json({ message: "API is running on Vercel!" });
});

export default app;