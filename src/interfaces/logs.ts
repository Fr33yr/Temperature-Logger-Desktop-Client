export interface ITempLog {
  id: number;
  name: string;
  temperature: number;
  created_at: string;
}

export enum LogTimeRange {
  Live = "LIVE",
  Hour = "HOUR",
  Day = "DAY",
  Week = "WEEK",
  Default = ""
}

export interface ITempLogsWithFlag {
  logs: ITempLog[],
  flag: LogTimeRange
}

interface ITempLogIntervals {
  hour: ITempLog[];
  day: ITempLog[];
  week: ITempLog[];
}

export interface LogState {
  [sensor: string]: ITempLogIntervals;
}

export interface LogsInitialState { hour: [], day: [], week: [], live: [] }
