import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINRAY_CLOUD_NAME,
  api_key: process.env.CLOUDINRAY_API_KEY,
  api_secret: process.env.CLOUDINRAY_API_SECRET,
});

const uploadOnCloudinary = async (path) => {
  try {
    const res = await cloudinary.uploader.upload(path, {
      resource_type: "image",
    });
    return res;
  } catch (error) {
    console.log("Error", error);
    let err = new Error("Failed to uplaod file on cloudinary");
    err.statusCode = 500;
    throw err;
  }
};

export default uploadOnCloudinary;
