import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },

  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
