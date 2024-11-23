import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SwapiResult } from "../api/apiClients/swapiClient";

interface CacheEntry {
  data: SwapiResult;
  expiry: number;
}

interface SwapiState {
  cache: Record<string, CacheEntry>;
}

const initialState: SwapiState = {
  cache: {},
};

const swapiSlice = createSlice({
  name: "swapi",
  initialState,
  reducers: {
    setCache(
      state,
      action: PayloadAction<{
        endpoint: string;
        data: SwapiResult;
        expiry: number;
      }>
    ) {
      const { endpoint, data, expiry } = action.payload;
      state.cache[endpoint] = { data, expiry };
    },
  },
});

export const { setCache } = swapiSlice.actions;
export default swapiSlice.reducer;
