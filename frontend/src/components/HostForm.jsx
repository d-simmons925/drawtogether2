import { useState, useEffect } from 'react'
import {
  useHostRoomMutation,
  useGenRoomMutation
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

const HostForm = () => {
  const [name, setName] = useState('')
  const [generatedRoom, setGeneratedRoom] = useState('')
  const dispatch = useDispatch()

  const [hostRoom] = useHostRoomMutation()
  const [genRoom] = useGenRoomMutation()

  const generateRoomName = async () => {
    try {
      const res = await genRoom().unwrap()
      setGeneratedRoom(res.roomName)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    generateRoomName()    
  }, [])

  const hostSubmit = async e => {
    e.preventDefault()
    try {

      const res = await hostRoom({ name, roomName: generatedRoom }).unwrap()
      dispatch(setUser({ ...res.user }))
      dispatch(setRoom({ ...res.room }))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box className='m-auto flex flex-col gap-4 p-8 rounded-md bg-stone-900 text-white'>
      <h2 className='text-center'>Host Room</h2>
        <TextField sx={textFieldSX}
                  color='primary'
                  variant='standard' 
                  label='Name' id='name' 
                  onChange={e => setName(e.target.value)}/>
        <h3 className='text-center p-2.5'>{generatedRoom}</h3>
      <Button variant='contained' onClick={e => hostSubmit(e)}>Host</Button>
    </Box>
  )
}
export default HostForm