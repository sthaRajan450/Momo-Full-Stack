import api from "./apiClient";

export const getFoods = async () => {
  const res = await api.get("/foods/");
  return res.data;
};
export const getFood = async (id) => {
  const res = await api.get(`/foods/${id}`);
  return res.data;
};
