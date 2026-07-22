import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import redis from "./src/config/redis.js";

await redis.connect();
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, (err) => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.err("Database Error:", err);
  });
