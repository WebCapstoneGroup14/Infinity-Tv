import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import userRouter from "./Routes/UserRoute.js";
import moviesRoutes from "./Routes/MovieRoutes.js";

import { errorHandler } from "./middlewares/errorMiddleWare.js";
import categoriesRoutes from "./Routes/CategoriesRoute.js";
import Uploadrouter from "./Controllers/UploadFile.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//connect Database
connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// other routes

app.use("/api/users", userRouter);
app.use("/api/movies", moviesRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/upload", Uploadrouter);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on PORT 5000");
  console.log("API URL:", process.env.URL);
});
