import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verfyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    const err = new Error("Token Not Provided");
    err.statusCode = 400;
    throw err;
  }
  try {
    const decoded = jwt.verify(token, "sdfjskfdoiejkdsjfdslfkksfd");
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    const err = new Error("Invalid Token");
    err.statusCode = 400;
    throw err;
  }
};
