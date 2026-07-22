import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  createOtp,
  createResetToken,
  verifyOtp,
  verifyResetToken,
} from "../services/otp.service.js";
import { sendOtpEmail } from "../services/email.service.js";
import redis from "../config/redis.js";
export const signUpUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const err = new Error("User already exist");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" },
  );

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken);
  res.cookie("refreshToken", refreshToken);
  res.status(201).json({
    message: "User Signedup Successfully",
    success: true,
    user,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    const err = new Error("User not registered");
    err.statusCode = 400;
    throw err;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const err = new Error("Invalid credentials");
    err.statusCode = 400;
    throw err;
  }
  const accessToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );
  const refreshToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" },
  );

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("accessToken", accessToken);
  res.cookie("refreshToken", refreshToken);
  res.status(200).json({
    message: "User LoggedIn Successfully",
    success: true,
    user,
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "User LoggedOut Successfully",
    success: true,
  });
};

export const getCurrentUser = (req, res) => {
  const user = req.user;

  res.status(200).json({
    message: "User fetched Successfully",
    success: true,
    user,
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      success: true,
      message: "User does not exist.",
    });
  }

  const otp = await createOtp(email);

  await sendOtpEmail(email, otp);
  return res.status(200).json({
    success: true,
    message: "OTP has been sent on email",
  });
};

export const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;

  await verifyOtp(email, otp);

  const resetToken = await createResetToken(email);

  res.status(200).json({
    success: true,
    message: "OTP verified successfully",
    resetToken,
  });
};

export const resetPassword = async (req, res) => {
  const { email, resetToken, password } = req.body;

  await verifyResetToken(email, resetToken);

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.findOneAndUpdate(
    { email },
    {
      password: hashedPassword,
    },
  );

  await redis.del(`reset:${email}`);

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
};
