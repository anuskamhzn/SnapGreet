import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access: No token provided",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    const decode = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized Access: Invalid token",
    });
  }
};


export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access: User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access: Admin privileges required",
      });
    }

    next();
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
