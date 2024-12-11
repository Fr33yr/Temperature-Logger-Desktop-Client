import { fetch } from "@tauri-apps/plugin-http";
import { debug, error as logError } from "@tauri-apps/plugin-log";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import "./Logs.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhook";
import { addSensorData, setCurrentLog } from "../../redux/features/logsSlice";
import { ITempLog, LogTimeRange } from "../../interfaces/logs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

export default function Logs() {
  const selectedServer = useAppSelector((state) => state.serversReducer);
  const { currentLog } = useAppSelector((state) => state.logsReducer); // the selected list of log
  const dispatch = useAppDispatch();

  const [chartData, setChartData] = useState<any | null>();

  useEffect(() => {
    if (currentLog && currentLog.length) {
      const uniqueNames = currentLog.reduce<string[]>(
        (accumulator, currentValue) => {
          if (!accumulator.includes(currentValue.name)) {
            accumulator.push(currentValue.name);
          }
          return accumulator;
        },
        []
      );

      const colors = ["#f3ba2f", "#2a71d0", "#f3ba2f"];

      const DataSets = uniqueNames.map((element, index) => {
        return {
          label: element,
          data: currentLog
            .filter((log) => log.name == element)
            .map((d) => d.temperature),
          backgroundColor: colors[index],
          borderColor: "black",
          borderWidth: 1,
        };
      });

      setChartData({
        labels: currentLog.map((data) => {
          const date = new Date(data.created_at);
          const formattedDate = `${date
            .getHours()
            .toString()
            .padStart(2, "0")}:${date
            .getMinutes()
            .toString()
            .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}/${(
            date.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}`;
          return formattedDate;
        }),
        datasets: DataSets,
      });
    }
  }, [currentLog]);

  return (
    <div className="logs">
      <h2 className="title">Logs</h2>
      {chartData && (
        <Line
          data={chartData}
          options={{
            plugins: {
              title: { display: true, text: "..." },
              legend: { display: false },
            },
          }}
        />
      )}
      <div className="logsButtons">
        <button onClick={() => fetchLogsData(LogTimeRange.Week)}>Week</button>
        <button onClick={() => fetchLogsData(LogTimeRange.Day)}>Day</button>
        <button onClick={() => fetchLogsData(LogTimeRange.Hour)}>Hour</button>
        <button onClick={() => fetchLogsData(LogTimeRange.Live)}>Live</button>
      </div>
    </div>
  );

  async function fetchLogsData(logTimeFrame: LogTimeRange) {
    try {
      const response = await fetch(
        `${selectedServer.selectedServer.url}templogs`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        debug("response ok!");
        dispatch(addSensorData({ flag: logTimeFrame, logs: data }));
        if (data && Array.isArray(data) && data.length > 0) {
          dispatch(addSensorData({ flag: logTimeFrame, logs: data }));
          dispatch(setCurrentLog(logTimeFrame));
        } else {
          debug("No valid data received");
        }
      } else {
        logError(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      logError(`Error fetching data ${error}`);
    }
  }
}
