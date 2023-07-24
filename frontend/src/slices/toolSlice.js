import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pickedColor: '#000000',
  pickedSize: 10,
  toolType: 'pen',
}

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.pickedColor = action.payload
    },
    setSize: (state, action) => {
      state.pickedSize = action.payload
    },
    setTool: (state, action) => {
      state.toolType = action.payload
    },
  }
})

export const { setColor, setSize, setTool } = toolSlice.actions

export default toolSlice.reducer