import express from "express";
import {
  forgotPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  resetPassword,
  signUpUser,
  verifyOtpController,
} from "../controllers/user.controller.js";
import { verfyToken } from "../middlewares/auth.middleware.js";

const userRoutes = express.Router();

userRoutes.route("/signup").post(signUpUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/logout").post(logoutUser);
userRoutes.route("/me").get(verfyToken, getCurrentUser);
userRoutes.route("/forgot-password").post(forgotPassword);
userRoutes.route("/reset-password").post(resetPassword);
userRoutes.route("/verify-otp").post(verifyOtpController);

export default userRoutes;
