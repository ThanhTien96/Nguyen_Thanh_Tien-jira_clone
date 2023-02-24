import {  configureStore } from '@reduxjs/toolkit'
import userSlice from './reducer/userSlice';
import projectSlice from './reducer/projectSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
     userSlice,
     projectSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()

