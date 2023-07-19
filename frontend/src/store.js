import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import roomReducer from './slices/roomSlice'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export default store