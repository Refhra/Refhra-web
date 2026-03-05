// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";

import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import scheduleReducer from "./slice/scheduleSlice";

import type { ThunkAction, Action } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    schedule: scheduleReducer, // <-- ADD THIS


  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
