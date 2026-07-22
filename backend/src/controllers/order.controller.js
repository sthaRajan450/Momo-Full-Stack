import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  const { foods } = req.body;
  const user = req.user;

  const order = await Order.create({
    userId: user._id,
    foods,
  });
  res.status(201).json({
    message: "Order Created",
    success: true,
    order,
  });
};

export const success = async (req, res) => {
  const encoded = req.query.data;
  const transactionDetails = JSON.parse(atob(encoded));
  await Order.findByIdAndUpdate(
    transactionDetails.transaction_uuid,
    { paymentStatus: transactionDetails.status },
    { new: true },
  );
  res.redirect(
    `http://localhost:5173/success?id=${transactionDetails.transaction_uuid}`,
  );
};

export const getOrder = async (req, res) => {
  const id = req.params.id;

  const order = await Order.findById(id)
    .populate("userId")
    .populate("foods.foodId");
  res.status(201).json({
    message: "Order fetched",
    success: true,
    order,
  });
};
