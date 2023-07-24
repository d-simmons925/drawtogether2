import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import roomReducer from './slices/roomSlice'
import toolReducer from './slices/toolSlice'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    tool: toolReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export default store