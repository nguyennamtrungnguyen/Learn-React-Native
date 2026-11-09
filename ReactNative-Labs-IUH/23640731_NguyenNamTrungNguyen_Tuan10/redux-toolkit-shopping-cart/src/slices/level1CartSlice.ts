import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Level1CartItem {
  id: number;
  name: string;
  price: number;
}

interface Level1CartState {
  items: Level1CartItem[];
}

const initialState: Level1CartState = {
  items: [],
};

const level1CartSlice = createSlice({
  name: 'level1Cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ
    addToCart: (state, action: PayloadAction<Level1CartItem>) => {
      state.items.push(action.payload);
    },

    // Xóa sản phẩm khỏi giỏ
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Xóa tất cả giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export default level1CartSlice.reducer;
export const {
  addToCart: addToLevel1Cart,
  removeFromCart: removeFromLevel1Cart,
  clearCart: clearLevel1Cart,
} = level1CartSlice.actions;
