export interface ITempLog {
  tag: string;
  temperature: number;
  created_at: Date;
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

export interface LogsInitialState {
  [sensor: string]: ITempLogIntervals;
}
