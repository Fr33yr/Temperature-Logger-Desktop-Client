import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IServer {
  name: string;
  url: string;
}

interface IServersInitialState {
  selectedServer: IServer;
  servers: IServer[];
}

export const initialServersState = {} as IServersInitialState;

export const servers = createSlice({
  name: "servers",
  initialState: initialServersState,
  reducers: {
    reset: () => {
      return initialServersState;
    },
    selectServer: (state, action: PayloadAction<IServer>) => {
      const { name, url } = action.payload;
      return {
        ...state,
        selectedServer: {
          name,
          url,
        },
      };
    },
    addServer: (state, action: PayloadAction<IServer>) => {
      return {
        ...state,
        servers: [...state.servers, action.payload],
      };
    },
    deleteServer: (state, action: PayloadAction<String>) => {
      if (action.payload == state.selectedServer.url) {
        return {
          ...state,
          selectedServer: {
            name: "",
            url: "",
          },
          servers: state.servers.filter((item) => item.url !== action.payload),
        };
      } else {
        return {
          ...state,
          servers: state.servers.filter((item) => item.url !== action.payload),
        };
      }
    },
  },
});

export const { reset } = servers.actions;
export default servers.reducer;
