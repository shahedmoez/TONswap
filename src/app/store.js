import { configureStore } from '@reduxjs/toolkit';
import exchangeReducer from '../features/Exchange/exchangeSlice';

export const store = configureStore({
  reducer: {
    exchange: exchangeReducer,

  },
});
