import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../utils/storage';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  taxRate: number; // 10% = 0.1
  shippingCost: number;
}

const initialState: CartState = {
  items: storage.getItemSync<CartItem[]>([]),
  discountCode: null,
  taxRate: 0.1,
  shippingCost: 10,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Khôi phục dữ liệu từ AsyncStorage trên thiết bị di động
    hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },

    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Lưu vào LocalStorage / AsyncStorage
      storage.setItem(state.items);
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      storage.setItem(state.items);
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      storage.setItem(state.items);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      storage.setItem(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.discountCode = null;
      storage.removeItem();
    },

    // Áp dụng mã giảm giá
    applyDiscount: (state, action: PayloadAction<string | null>) => {
      state.discountCode = action.payload;
    },

    // Đặt phí vận chuyển
    setShippingCost: (state, action: PayloadAction<number>) => {
      state.shippingCost = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  hydrateCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
} = cartSlice.actions;
