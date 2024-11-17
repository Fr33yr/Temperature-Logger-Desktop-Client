import {configureStore} from '@reduxjs/toolkit'

import logsReducer from './features/logsSlice'
import serversReducer from './features/serversSlice'

export const store = configureStore({
    reducer: {
        logsReducer,
        serversReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch