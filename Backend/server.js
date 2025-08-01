import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import db from "./model/db.js";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"; // Adjust the path as necessary
import shoppingCartRoutes from "./routes/shoppingCartRoutes.js"; // Adjust the path as necessary
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for login and registration routes
app.use("/api/user", userRoutes);
app.use("/api/home", shoppingCartRoutes);
// for testing the server
app.get("/", (req, res) => {
  res.send("welcome to the backend server");
});

// for handling global error using middleware(error handling middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next();
});
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
