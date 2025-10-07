import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

// Helper function to save cart state in localStorage
const saveCartState = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.cart));
  localStorage.setItem("total", JSON.stringify(state.total));
  localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        toast.error("Course already in cart");
        return;
      }

      state.cart.push(course);
      state.totalItems += 1;
      state.total += course.price;
      toast.success("Course added to cart");

      saveCartState(state);
    },

    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cart.findIndex((item) => item._id === courseId);

      if (index === -1) {
        toast.error("Course not found in cart");
        return;
      }

      const removedCourse = state.cart[index];
      state.cart.splice(index, 1);
      state.totalItems -= 1;
      state.total -= removedCourse.price;
      toast.success("Course removed from cart");

      saveCartState(state);
    },

    clearCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");

      toast.success("Cart cleared");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
