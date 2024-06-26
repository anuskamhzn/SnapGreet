import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import birthdayRoute from "./routes/birthdayRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoute from "./routes/notificationRoute.js";

//configure env
dotenv.config();

//db config
connectDB();

//rest obj
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wish", birthdayRoute);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1", notificationRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO SNAP GREET </h1>");
});

//PORT
const PORT = process.env.PORT || 5000;

// app.use(express.static("../frontend/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
