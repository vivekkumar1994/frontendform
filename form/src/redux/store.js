// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import {BrowserRouter, Route, Routes} from "react-router-dom"

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>

export default store;
