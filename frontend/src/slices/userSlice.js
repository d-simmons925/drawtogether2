import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userId', JSON.stringify(action.payload.id))
    },
    logout: state => {
      state.userInfo = null
      localStorage.removeItem('userId')
    },
  },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
