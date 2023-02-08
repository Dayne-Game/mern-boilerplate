import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/ErrorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

// Import Routes
import UserRoutes from "./routes/UserRoutes.js";
import UploadRoutes from "./routes/UploadRoutes.js";
import ResetPasswordRoutes from "./routes/ResetPasswordRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

dotenv.config();

connectDB();

const app = express();
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());


app.use("/api/users", UserRoutes);
app.use("/api/upload", UploadRoutes);
app.use("/api/reset-password", ResetPasswordRoutes);
app.use('/api/auth', AuthRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);