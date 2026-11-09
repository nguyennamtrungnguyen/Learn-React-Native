import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import level1CartReducer from './slices/level1CartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    level1Cart: level1CartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
