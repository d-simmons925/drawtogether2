import { useState} from 'react'
import {
  useJoinRoomMutation,
} from '../slices/apiSlice'
import { useDispatch} from 'react-redux'
import { setUser } from '../slices/userSlice'
import { setRoom } from '../slices/roomSlice'
import { Box, TextField, Button } from '@mui/material'

const textFieldSX = {
  '& .MuiInputBase-root:before': {
    borderBottom: '1px solid white',
  },
  input: {
    color: 'text.primary'
  },
  label: {
    color: 'text.primary'
  },
}

const JoinForm = () => {
  const [name, setName] = useState('')
  const [roomName, setRoomName] = useState('')
  const dispatch = useDispatch()

  const [joinRoom] = useJoinRoomMutation()

  const joinSubmit = async e => {
    e.preventDefault()
    try {
      const res = await joinRoom({ name, roomName }).unwrap()
      dispatch(setUser({ ...res.user }))
      dispatch(setRoom({ ...res.room }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box className='m-auto flex flex-col gap-4 p-8 rounded-md bg-stone-900 text-white'>
      <h2 className='text-center'>Join Room</h2>
      <TextField sx={textFieldSX} color='success' variant='standard' label='Name' id='name' onChange={e => setName(e.target.value)}/>
      <TextField sx={textFieldSX} color='success' variant='standard' label='Room' id='room' onChange={e => setRoomName(e.target.value)}/>
      <Button variant='contained' color='success' onClick={e => joinSubmit(e)}>Join</Button>
    </Box>
  )
}
export default JoinForm