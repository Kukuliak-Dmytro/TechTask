import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './bookSlicer';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

// Define RootState
export type RootState = ReturnType<typeof store.getState>;

// Export the store's dispatch type
export type AppDispatch = typeof store.dispatch;
