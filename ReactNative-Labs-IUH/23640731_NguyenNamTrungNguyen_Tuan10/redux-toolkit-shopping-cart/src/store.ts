import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import level1CartReducer from './slices/level1CartSlice';
import level2CartReducer from './slices/level2CartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    level1Cart: level1CartReducer,
    level2Cart: level2CartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
