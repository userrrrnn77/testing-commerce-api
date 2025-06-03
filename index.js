// api/app.js

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./api/config/Database.js";
import userRouter from "./api/routes/UserRoutes.js";
import productRouter from "./api/routes/ProductRoutes.js";

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

app.listen(5000, () => console.log(`server up and running at http://localhost:5000`))

export default app;
