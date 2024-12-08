import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { debug } from "@tauri-apps/plugin-log";
import {
  LogsInitialState,
  ITempLogsWithFlag,
  LogTimeRange,
} from "../../interfaces/logs";

export const initialLogState = {
  hour: [],
  day: [],
  week: [],
  live: [],
} as LogsInitialState;

export const logs = createSlice({
  name: "logs",
  initialState: initialLogState,
  reducers: {
    reset: () => {
      return initialLogState;
    },
    addSensorData: (state, action: PayloadAction<ITempLogsWithFlag>) => {
      const { logs, flag } = action.payload;
      debug(`Processing flag:${flag} and payload:${logs}`);
      
      return {
        ...state,
        [flag.toLocaleLowerCase()]: logs,
      }
    },
  },
});

export const { reset, addSensorData } = logs.actions;
export default logs.reducer;
