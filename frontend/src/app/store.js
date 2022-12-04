import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
// import homePC..(yani kuch bhee) from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
