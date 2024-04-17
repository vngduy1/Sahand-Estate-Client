import express from "express";

import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import connectDB from "./db/connectDb.js";
import userRouter from "./routes/user.route.js";
import authController from "./routes/auth.route.js";

//connect mongoDB
connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

//route
app.use("/api/user", userRouter);
app.use("/api/auth", authController);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
