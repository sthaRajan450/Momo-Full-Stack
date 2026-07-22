import express from "express";
import { addFood, getFood, getFoods } from "../controllers/food.controller.js";
import upload from "../middlewares/upload.middleware.js";

const foodRoutes = express.Router();

foodRoutes.route("/add").post(upload.single("photo"), addFood);
foodRoutes.route("/").get(getFoods);
foodRoutes.route("/:id").get(getFood);
export default foodRoutes;
