import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roomInfo: null,
}

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.roomInfo = action.payload
      localStorage.setItem('roomName', JSON.stringify(action.payload.name))
    },
    leaveRoom: state => {
      state.roomInfo = null
      localStorage.removeItem('roomName')
    },
    //handle other users leaving rooms
    userLeave: (state, action) => {
      console.log(action.payload)
      const index = state.roomInfo.users.findIndex(user => user.id === action.payload)
      state.roomInfo.users[index].active = false
    },
    addUser: (state, action) => {
      //for some reason this runs multiple times when more users join, to handle that check if user is already in room
      let userExists = false
      state.roomInfo.users.forEach(user => {
        if (user.id === action.payload.id) {
          userExists = true
        }
      })
      {
        !userExists && state.roomInfo.users.push(action.payload)
      }
    },
  },
})

export const { setRoom, leaveRoom, addUser, userLeave } = roomSlice.actions

export default roomSlice.reducer
