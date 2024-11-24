import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IServer {
  name: string;
  url: string;
}

export interface IServersInitialState {
  selectedServer: IServer;
  servers: IServer[];
}

export const initialServersState = {
  selectedServer: {
    name: "",
    url: ""
  },
  servers: []
} as IServersInitialState;

export const servers = createSlice({
  name: "servers",
  initialState: initialServersState,
  reducers: {
    reset: () => {
      return initialServersState;
    },
    loadServerData: (state, action: PayloadAction<IServersInitialState>) =>{
      const {selectedServer, servers} = action.payload
      if(servers.length === 0 || selectServer.name.length === 0){
        return
      }
      return {
        ...state,
        selectedServer,
        servers
      }
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

export const { reset, selectServer, addServer, deleteServer, loadServerData } = servers.actions;
export default servers.reducer;
