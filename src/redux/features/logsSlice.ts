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
  currentLog: [],
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
      // checking incoming logs to avoid unnecesary re renders
      if (
        JSON.stringify(logs) ===
        JSON.stringify(
          state[flag.toLocaleLowerCase() as keyof LogsInitialState]
        )
      ) {
        return {
          ...state,
          [flag.toLocaleLowerCase()]: logs,
        };
      }
      return {
        ...state,
        [flag.toLocaleLowerCase()]: logs,
      };
    },
    setCurrentLog: (state, action: PayloadAction<LogTimeRange>) => {
      return {
        ...state,
        currentLog:
          state[action.payload.toLocaleLowerCase() as keyof LogsInitialState],
      };
    },
  },
});

export const { reset, addSensorData, setCurrentLog } = logs.actions;
export default logs.reducer;
