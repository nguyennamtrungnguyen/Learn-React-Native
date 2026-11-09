import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm (kiểm tra nếu đã có)
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // Nếu sản phẩm đã có → tăng số lượng
        existingItem.quantity += 1;
      } else {
        // Nếu chưa có → thêm mới với quantity = 1
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },

    // Tăng số lượng
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // Giảm số lượng
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Xóa sản phẩm
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Xóa tất cả
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// Selector: Tính tổng số lượng
export const selectCartItemCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// Selector: Tính tổng tiền
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

// Selector: Lấy danh sách items
export const selectCartItems = (state: RootState) => state.cart.items;
