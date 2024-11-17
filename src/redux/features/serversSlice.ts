import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialServersState = {
  value: {
    selectedServer: {},
    servers: [],
  },
};

export const servers = createSlice({
  name: "servers",
  initialState: initialServersState,
  reducers: {
    reset: () => {
      return initialServersState;
    },
  },
});

export const { reset } = servers.actions;
export default servers.reducer;
