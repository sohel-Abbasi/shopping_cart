import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const ensureAuthenticated = async (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) {
    return res.status(401).json({
      message: "Authorization header is missing, JWT is required",
      success: false,
    });
  }
  const token = headers.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is missing", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
