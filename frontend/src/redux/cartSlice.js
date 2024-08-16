import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    totalItems: 0,
  },
  reducers: {
    addTocart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.total_price = existingItem.quantity * action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          total_price: action.payload.price,
        });
      }
      state.totalAmount = parseFloat(
        (state.totalAmount + action.payload.price).toFixed(2)
      );
      state.totalItems += 1;
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemToRemove) {
        state.totalAmount = parseFloat(
          (
            state.totalAmount -
            itemToRemove.price * itemToRemove.quantity
          ).toFixed(2)
        );
        state.totalItems -= itemToRemove.quantity;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    adjustQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        const qtyDif = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        item.total_price = item.quantity * item.price;

        state.totalAmount = parseFloat(
          (state.totalAmount + qtyDif * item.price).toFixed(2)
        );
        state.totalItems += qtyDif;
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
      state.totalAmount = 0;
      state.totalItems = 0;
    },
  },
});

export const { addTocart, removeItem, clearCart, adjustQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
