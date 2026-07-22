import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const food = state.cartItems.find(
        (item) => item._id == action.payload._id,
      );

      if (food) {
        food.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    increment: (state, action) => {
      const food = state.cartItems.find((item) => item._id == action.payload);

      food.quantity += 1;
    },
    decrement: (state, action) => {
      const food = state.cartItems.find((item) => item._id == action.payload);

      if (food.quantity > 1) {
        food.quantity -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload,
      );
    },
  },
});

export const { addToCart, increment, decrement,removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
