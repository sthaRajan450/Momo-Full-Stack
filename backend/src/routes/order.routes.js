import express from "express";
import { verfyToken } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getOrder,
  success,
} from "../controllers/order.controller.js";

const orderRoutes = express.Router();

orderRoutes.route("/create").post(verfyToken, createOrder);
orderRoutes.route("/success").get(success);

orderRoutes.route("/:id").get(getOrder);

export default orderRoutes;
