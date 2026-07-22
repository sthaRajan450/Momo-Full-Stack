import api from "./apiClient";

export const signupUser = async (data) => {
  try {
    const res = await api.post("/users/signup", data);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("Failed to signup user", error.response.data.message);
    alert(error.response.data.message);
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post("/users/login", data);
   
    return res.data;
  } catch (error) {
    console.log("Failed to login user", error.response.data.message);
    alert(error.response.data.message);
  }
};

export const logoutUser = async () => {
  const res = await api.post("/users/logout");
  console.log(res.data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  
  return res.data;
};
