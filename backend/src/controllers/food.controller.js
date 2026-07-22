import Food from "../models/food.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;

  let url = null;

  if (req.file) {
    const cloduinaryResponse = await uploadOnCloudinary(req.file.path);
    console.log(cloduinaryResponse);
    url = cloduinaryResponse.secure_url;
  }

  const food = await Food.create({
    name,
    description,
    price,
    category,
    photo: url,
  });
  res.status(201).json({
    message: "Food added successfully",
    success: true,
    food,
  });
};

export const getFoods = async (req, res) => {
  const foods = await Food.find();

  if (foods.length == 0 || !foods) {
    const err = new Error("Foods not found");
    err.statusCode = 404;
    throw err;
  }
  res.status(200).json({
    message: "Foods fetched successfully",
    success: true,
    foods,
  });
};

export const getFood = async (req, res) => {
  const id = req.params.id;
  const food = await Food.findById(id);

  if (!food) {
    const err = new Error("Food not found");
    err.statusCode = 404;
    throw err;
  }
  res.status(200).json({
    message: "Food fetched",
    success: true,
    food,
  });
};
