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
import { useEffect, useRef, useState } from "react";
import WebSocket from "@tauri-apps/plugin-websocket";

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
  const { url, name } = useAppSelector(
    (state) => state.serversReducer.selectedServer
  );
  const { currentLog } = useAppSelector((state) => state.logsReducer); // the selected list of log
  const dispatch = useAppDispatch();
  const wsRef = useRef<WebSocket | null>(null);

  const [chartData, setChartData] = useState<any | null>();

  useEffect(() => {
    const connectWebSocket = async () => {
      debug(`Attempting connection...`)
      try {
        // Create the WebSocket connection
        const ws = await WebSocket.connect(url);
        wsRef.current = ws;
        
        // Add a listener for messages
        ws.addListener((msg) => {
          debug(`Received Message: ${JSON.stringify(msg)}`);
        });

        

        debug(JSON.stringify(`asdasdasdasd ${ws}`))
      } catch (error) {
        console.error("WebSocket connection error:", error);
      }
    };

    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      if (wsRef.current) {
        wsRef.current
          .disconnect()
          .catch((err) => logError("Error disconnecting WebSocket:", err));
      }
    };
  }, []);

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
      const response = await fetch(`${url}templogs`, {
        method: "GET",
      });
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
