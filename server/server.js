import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
// import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js";
import birthdayRoute from "./routes/birthdayRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoute from "./routes/notificationRoute.js";

// Configure env
dotenv.config();

// DB config
connectDB();

// Rest obj
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wish", birthdayRoute);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1", notificationRoute);

// Rest API
app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO SNAP GREET </h1>");
});

// Define __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static("../frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend","build", "index.html"));
});

// PORT
const PORT = process.env.PORT || 5000;

// Run listen
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
