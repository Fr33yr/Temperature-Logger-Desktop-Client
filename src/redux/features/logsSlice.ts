import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  LogsInitialState,
  ITempLogsWithFlag,
  LogTimeRange,
} from "../../interfaces/logs";

export const initialLogState = {} as LogsInitialState;

export const logs = createSlice({
  name: "logs",
  initialState: initialLogState,
  reducers: {
    reset: () => {
      return initialLogState;
    },
    addSensorData: (state, action: PayloadAction<ITempLogsWithFlag>) => {
      if (action.payload.logs.length && action.payload.logs[0].tag.length) {
        const tag = action.payload.logs[0].tag; // sensor tag
        if (state[tag]) {
          const { logs, flag } = action.payload;
          switch (flag) {
            case LogTimeRange.Hour:
              state[tag] = {
                ...state[tag],
                hour: logs,
              };
              break;
            case LogTimeRange.Day:
              state[tag] = {
                ...state[tag],
                day: logs,
              };
              break;
            case LogTimeRange.Week:
              state[tag] = {
                ...state[tag],
                week: logs,
              };
              break;
            case LogTimeRange.Default:
              break;
          }
        }
      }
    },
    // TODO: Add 4 reducers 1 for each array (live, hour, day, week). Use the addSensor method as a template.
    // EXTRA: investigate if its possible to pass an enum and use 1 big reducer instead of creating one for each case.
  },
});

export const { reset, addSensorData } = logs.actions;
export default logs.reducer;
