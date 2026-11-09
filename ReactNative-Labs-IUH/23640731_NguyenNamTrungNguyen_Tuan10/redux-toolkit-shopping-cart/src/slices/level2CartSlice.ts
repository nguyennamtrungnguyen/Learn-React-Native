import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Level2CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Level2CartState {
  items: Level2CartItem[];
}

const initialState: Level2CartState = {
  items: [],
};

const level2CartSlice = createSlice({
  name: 'level2Cart',
  initialState,
  reducers: {
    // Thêm sản phẩm (kiểm tra nếu đã có)
    addToCart: (state, action: PayloadAction<Omit<Level2CartItem, 'quantity'>>) => {
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

export default level2CartSlice.reducer;
export const {
  addToCart: addToLevel2Cart,
  increaseQuantity: increaseLevel2Quantity,
  decreaseQuantity: decreaseLevel2Quantity,
  removeFromCart: removeFromLevel2Cart,
  clearCart: clearLevel2Cart,
} = level2CartSlice.actions;

// Selector: Tính tổng số lượng
export const selectLevel2CartItemCount = (state: RootState) =>
  state.level2Cart.items.reduce((total, item) => total + item.quantity, 0);

// Selector: Tính tổng tiền
export const selectLevel2CartTotal = (state: RootState) =>
  state.level2Cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

// Selector: Lấy danh sách items
export const selectLevel2CartItems = (state: RootState) =>
  state.level2Cart.items;
