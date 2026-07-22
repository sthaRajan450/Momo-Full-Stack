import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

export default redis;
