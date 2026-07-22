import api from "./apiClient";

export const createOrder = async (order) => {
  const res = await api.post("/orders/create", order);
  return res.data;
};

export const getOrder = async (orderId) => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data;
};
