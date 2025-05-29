import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import database from "./api/config/Database.js";
import userRouter from "./api/routes/UserRoutes.js";
import productRouter from "./api/routes/ProductRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

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
  res.send(`
        <div style="width:100%; height:100vh; display:flex; justify-content:center; align-items:center; background-color:#fff;">
            <h1 style="color:#3dd;">Respons From API</h1>
        </div>`);
});

app.listen(PORT, () =>
  console.log(`Server up and Running at http://localhost:${PORT}`)
);

export default app;
