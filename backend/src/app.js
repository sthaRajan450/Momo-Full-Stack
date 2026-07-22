import express from "express";
import userRoutes from "./routes/user.routes.js";
import globalErrorMiddleware from "./middlewares/globalError.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import foodRoutes from "./routes/food.routes.js";
import orderRoutes from "./routes/order.routes.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

app.use(globalErrorMiddleware);

export default app;
