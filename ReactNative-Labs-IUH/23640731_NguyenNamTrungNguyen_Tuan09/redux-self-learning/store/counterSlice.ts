import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

export interface CounterState {
  value: number;
  step: number;
}

const initialState: CounterState = {
  value: 0,
  step: 1,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += state.step;
    },
    decrement: (state) => {
      state.value -= state.step;
    },
    incrementByFive: (state) => {
      state.value += 5;
    },
    reset: (state) => {
      state.value = 0;
      state.step = 1;
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
  },
});

export const { increment, decrement, incrementByFive, reset, setStep } =
  counterSlice.actions;

// Selectors (Phần X.4)
export const selectCounterValue = (state: RootState) => state.counter.value;
export const selectCounterStep = (state: RootState) => state.counter.step;

export default counterSlice.reducer;

