import redis from "../config/redis.js";
import { generateOtp } from "../utils/generateOtp.js";
import bcrypt from "bcryptjs";
import { generateResetToken } from "../utils/generateResetToken.js";
const OTP_PREFIX = "otp:";
const OTP_EXPIRY = Number(process.env.OTP_EXPIRE) || 300;
const MAX_ATTEMPTS = Number(process.env.OTP_MAX_ATTEMPTS) || 5;

const RESET_PREFIX = "reset:";
const RESET_EXPIRE = Number(process.env.RESET_TOKEN_EXPIRE) || 600;
export const createOtp = async (email) => {
  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);

  const payload = {
    otp: hashedOtp,
    attempts: 0,
  };

  await redis.set(`${OTP_PREFIX}${email}`, JSON.stringify(payload), {
    EX: OTP_EXPIRY,
  });

  return otp;
};

export const verifyOtp = async (email, otp) => {
  const key = `${OTP_PREFIX}${email}`;

  const data = await redis.get(key);

  if (!data) {
    throw new Error("OTP expired or not found");
  }

  const payload = JSON.parse(data);
  

  if (payload.attempts >= MAX_ATTEMPTS) {
    await redis.del(key);
    throw new Error("Maximum OTP attempts exceeded");
  }

  const isValid = await bcrypt.compare(otp, payload.otp);

  if (!isValid) {
    payload.attempts += 1;
    const ttl = await redis.ttl(key);
    await redis.set(key, JSON.stringify(payload), { Ex: ttl });
    throw new Error("Invalid OTP");
  }

  await redis.del(key);
  return true;
};

export const createResetToken = async (email) => {
  const token = generateResetToken();

  await redis.set(`${RESET_PREFIX}${email}`, token, {
    EX: RESET_EXPIRE,
  });

  return token;
};

export const verifyResetToken = async (email, token) => {
  const savedToken = await redis.get(`reset:${email}`);

  if (!savedToken) throw new Error("Reset token expired");

  if (savedToken !== token) throw new Error("Invalid reset token");

  return true;
};
