import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  useGetDataMutation,
} from '../slices/apiSlice'
import { setUser } from '../slices/userSlice'
import { setRoom } from '../slices/roomSlice'
import HostForm from '../components/HostForm'
import JoinForm from '../components/JoinForm'
import { Container } from '@mui/material'

const HomePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [getData] = useGetDataMutation()
  

  const { roomInfo } = useSelector(state => state.room)

  const rejoin = async () => {
    try {
      const res = await getData({
        userId: JSON.parse(localStorage.getItem('userId')),
        roomName: JSON.parse(localStorage.getItem('roomName')),
      }).unwrap()
      dispatch(setUser({ ...res.user }))
      dispatch(setRoom({ ...res.room }))
    } catch (err) {
      localStorage.removeItem('userId')
      localStorage.removeItem('roomName')
      console.log(err)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('userId') && localStorage.getItem('roomName')) {
      rejoin()
  }
  }, [roomInfo])

  useEffect(() => {
    if (roomInfo) {
      navigate(`/${roomInfo.name}`)
    }
  }, [navigate, roomInfo])

  return (
    <Container className="h-screen w-2/3 flex justify-center align-center ">
      <HostForm/>
      <JoinForm/>
    </Container>
  )
}
export default HomePage
