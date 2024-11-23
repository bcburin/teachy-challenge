import { configureStore } from "@reduxjs/toolkit";
import swapiReducer from "./swapiSlice";

export const store = configureStore({
  reducer: {
    swapi: swapiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
